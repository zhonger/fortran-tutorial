---
sidebar_position: 4
---

# 子程序

Fortran 语言中的子程序事实上和其他编程语言的函数有点类似（后面会提到 Fortran 本身也支持函数）：把需要重复使用的某些代码都集中成一个子程序，调用时可以给子程序初始化一些变量值从而获得不同的结果。比如说数值微分或者微分方程组的解法一类的数值计算代码就可以写成子程序的形式。

## 定义和调用

子程序的一般结构如下所示：

```fortran
!!! 不带初始化变量的子程序
subroutine subr1
    implicit none
    real a, b
    integer i
    ......
    ......
end subroutine subr1

!!! 带初始化变量的子程序
subroutine subr2(x, m, y, n)
    implicit none
    real x, y, a, b, z(10)
    integer m, n, i, k
    ......
    ......
end subroutine subr2

!!! 调用子程序
real z
integer m
call subr1
m = 21
call subr2(10.0, 100, z, m*5+1)
```

子程序是以 `subroutine` 开头、以 `end subroutine` 结尾，其中第一行与一般主程序一样需要添加一行 `implicit none` 的声明。

:::tip 小提示
**值得注意**的是，子程序可以在主程序中被任意调用若干次，但同时也是依赖主程序存在的，即只有子程序的代码无法被执行。
:::

从上面的例子可以看出，无论是初始化还是没初始化变量，子程序都可以在主程序中被调用执行。只不过带初始化变量的子程序应该在被调用时给定相应的变量，否则无法正常被调用。

如下所示是一个完整包含主程序和子程序的代码示例。主程序是以 `program` 开头、以 `end program` 结尾的代码片段。子程序代码不被包含在主程序代码片段中，但与主程序在同一文件中。

:::tip 小提示
子程序可以位于主程序代码片段之前或之后，不会影响在主程序中的正常调用。
:::

```fortran
program stest1
    implicit none
    real x, y
    x = 5.0
    y = 100.0
    call subr(x, y, 10)
    print *, x, y
end program stest1

subroutine subr(x, y, n)
    implicit none
    real x, y
    integer n
    x = n
    y = y*x
end subroutine subr
```

子程序的调用和主程序的执行顺序是：**主程序 → 子程序 → 主程序**。

由于子程序被调用时实际上不会与其他正在被执行的子程序相互干扰，所以可以在一个主程序中重复调用同一子程序。如果在子程序中需要根据某个条件判断中断退出，可以如下所示利用 `if` 语句和 `return` 关键字来返回主程序。

```fortran
subroutine subr(x, y, m, n)
    implicit none
    real x, y
    integer m, n
    ......
    if (m < n) return
    ......
end subroutine subr
```

## 局部变量

### 子程序变量的局部性

子程序中定义的局部变量和参数独立于主程序。也就是说，当我们在主程序和子程序中同时定义相同名称的变量时，其实它们之间也是不同的。只有当我们在调用子程序时使用主程序中同名的变量对参数进行赋值时，主程序和子程序的同名变量才会具有相同的值。

如下面的示例 1 所示，编译执行的结果并非是期待的 10.0 和 30.0。

```fortran
!!! 示例 1
program stest1
    implicit none
    real x, y
    x = 10.0
    y = 30.0
    call subr1
end program stest1

subroutine subr1
    implicit none
    real x, y
    print *, x, y
end subroutine subr1

!!! 执行结果
>>>    2.80259693E-45   0.00000000
```

当我们修改为带初始化变量的子程序时，如示例 2 所示，编译执行的结果和期待的一样。

```fortran
!!! 示例 2
program stest2
    implicit none
    real x, y
    x = 10.0
    y = 30.0
    call subr2(x, y)
end program stest2

subroutine subr2(x, y)
    implicit none
    real x, y
    print *, x, y
end subroutine subr2

!!! 执行结果
>>>    10.0000000       30.0000000
```

这两个例子的对比再一次证明了子程序中定义的变量所具有的局部性，必须通过参数传递的方式才能与主程序同名变量保持一样的初始化值。同样地，这种局部性也会让主程序的变量值不会因为子程序的同名变量值发生改变而改变。

有人可能会有疑问，如果子程序中的参数使用的变量名与主程序的变量名不一致，调用能不能成功呢？当然是能够成功的。如下所示，将示例 2 中子程序原来的参数 x 和 y 换成 a 和 b，依然可以输出正确结果。

```fortran
subroutine subr2(a, b)
    implicit none
    real a, b
    print *, a, b
end subroutine subr2

!!! 执行结果
>>>    10.0000000       30.0000000
```

### 类型声明的一致性

主程序中调用带初始化变量的子程序时，需要注意使用相同类型的变量来给子程序初始化参数，否则就会报错。如示例 3 中所示，子程序中所定义的参数 x 和 y 为实数、参数 m 和 n 为整数。主程序中调用时传递的变量值也是对应的实数和整数，具体如下表所示。

```fortran
!!! 示例 3
program stest3
    implicit none
    real z
    integer n
    z = 200.0
    n = 21
    call subr3(10.0, z**2, 100, n*5+1)
end program stest3

subroutine subr3(x, y, m, n)
    implicit none
    real x, y
    integer m, n
    print *, x, y, m, n
end subroutine subr3
```

| 调用语句 | 子程序语句 | 数值类型 |
| :----: | :----: | :----: |
| 10.0 | x | 实数 |
| z**2 | y | 实数 |
| 100 | m | 整数 |
| n*5+1 | n | 整数 |

### 子程序的返回值

刚才提到的子程序中定义的变量是局部变量，不会干扰主程序中的其他变量，但是如果我们想要把子程序计算的结果返回给主程序呢？在其他的编程语言中，可能大部分是使用 `return` 加变量名的方式来将子程序中的变量传递回主程序。在 Fortran 中，子程序会将参数变量全部返回给主程序，可以认为是地址引用。如果主程序调用子程序时用一个算式传递变量给子程序，那么可以认为是值引用。

如下面的示例 4 所示，主程序中调用子程序时最后的变量 p 就是要保存返回值的变量。从执行结果也可以看出，变量 x 和 y 并没有受到子程序的影响，只有变量 p 带着子程序的变量 z 的值正确返回了。因为这里 x+y 作为子程序中的 x 存在，而 x+y 这个变量实际上在主程序中不存在，所以是值引用。

```fortran
!!! 示例 4
program stest4
    implicit none
    real x, y, p
    x = 10.0
    y = 30.0
    call subr4(x+y, 20.0, p)
    print *, x, y, p
end program stest4

subroutine subr4(x, y, z)
    implicit none
    real x, y, z
    z = x*y
end subroutine subr4

!!! 执行结果
>>>   10.0000000       30.0000000       800.000000
```

:::tip 小提示
**值引用**和**地址引用**的定义：值引用是指引用值而不引用原来的变量或者存储器中对应的地址，地址引用是指引用原来的变量或者存储器中对应的地址。   
**值引用**和**地址引用**的区别：前者不会因子程序的操作而发生改变，后者可能会因子程序的操作而发生改变。如果我们仅仅是为了传递某个值给子程序作为输入，可以采用值引用，从而避免对于主程序的干扰。如果我们希望子程序的操作改变变量的值，可以采用地址引用。
:::

## 数组变量

### 数组作为子程序参数

如果主程序想要用数组变量或数组变量的某个位置的值为调用的子程序赋值，Fortran 也是完全支持的。如下所示，第一行是用数组变量初始化子程序参数，第二行是用数组变量 a 中编号为 1 的元素初始化子程序参数。

```fortran
call sub(a)
call sub(a(1))
```

上面第一行调用方式对应的主程序和子程序可以类似于下面的示例 5。主程序和子程序中分别将 a 和 x 都定义为长度为 10 的一维数组，并在子程序中使用循环的方式依次为数组 x 的每个元素赋值。最后，赋好值的数组 x 也会返回给主程序。从执行结果看到，输出结果为期待的 a(3) 值。

```fortran
!!! 示例 5
program stest5
    implicit none
    real a(10)
    call sub(a)
    print *, a(3)
end program stest5

subroutine sub(x)
    implicit none
    real x(10)
    integer i
    do i = 1, 10
        x(i) = i
    enddo
end subroutine sub

!!! 执行结果
>>>   3.00000000
```

如果我们在调用时写成了 `call sub(a(1))`，那会怎么样呢？实际上还是会得到一样的结果。

### 数组变量的顺序对应

如果将 `a(1)` 修改为 `a(3)` 并保持数组 a 的长度为 10，即数组 a 和数组 x 不从第一个元素开始对应，那么源代码将无法被编译，如示例 5 的变种一所示。

要想在这种情况下还能正常编译，我们就必须扩充数组 a 的长度至少为 12。这样一来，子程序中要赋值的数都能正确存入数组 x 并返回给主程序的数组变量 a，如示例 5 的变种二所示。

```fortran
!!! 示例 5 的变种一
program stest5
    implicit none
    real a(10)
    call sub(a(3))
    print *, a(3)
end program stest5

subroutine sub(x)
    implicit none
    real x(10)
    integer i
    do i = 1, 10
        x(i) = i
    enddo
end subroutine sub 

!!! 执行结果
>>> Error: Actual argument contains too few elements for dummy argument 'x' (8/10) at (1)

!!! 示例 5 的变种二
program stest5
    implicit none
    real a(12)
    call sub(a(3))
    print *, a(3)
end program stest5

subroutine sub(x)
    implicit none
    real x(10)
    integer i
    do i = 1, 10
        x(i) = i
    enddo
end subroutine sub 

!!! 执行结果
>>>   1.00000000
```

其实，在子程序中也可以不定义数组的长度，将长度设置为 `*`。

如下示例 6 所示，子程序的功能是将数组 a 中的前 n 个元素复制给数组 b。

```fortran
!!! 示例 6
subroutine copy(a, b, n)
    implicit none
    real a(*), b(*)
    integer n, i
    do i = i, n
        b(i) = a(i)
    enddo
end subroutine copy
```

### 二维数组变量

当然，除了一维数组，我们也可能会想在主程序中传递二维数组给子程序，但是 `a(*, *)` 的写法在 Fortran 中是不支持的。因此，我们需要把二维数组的维度也传递给子程序。

如下示例 7 所示，数组 a 和 b 为二维数组，m 和 n 是它们的维度。子程序中使用数组变量名和给定的维度定义出二维数组。示例 7 的主程序定义了四个二维数组及它们的维度大小，调用子程序时不仅传递了数组本身，也传递了维度大小。而子程序采用了两个 for 循环叠加的方式来交替给二维数组中的每一行每一列的元素赋值。

```fortran
!!! 示例 7
program stest1
    implicit none
    real a(10, 20), b(10, 20), c(100, 200), d(100, 200)
    ......
    call copy2d(a, b, 10, 20)
    call copy2d(c, d, 100, 200)
end program stest1

subroutine copy2d(a, b, m, n)
    implicit none
    real a(m, n), b(m, n)
    integer m, n, i, j
    do j = i, n
        do i = i, m
            b(i, j) = a(i, j)
        enddo
    enddo
end subroutine copy2d
```

:::tip 小提示
数组 a(m, n) 的定义表示数组的行号是从 1 到 m、列号是从 1 到 n。如果想要行号和列号从 0 开始，则应该将数组定义为 a(0:m-1, 0:n-1)。一维数组时可以定义为 a(0:*)。
:::

## 函数副程序

函数副程序，这个称呼不一定十分准确，实际上就是其他编程语言中常用的函数。在某种程度上，函数只是子程序的替代，但是对于 Fortran 来说，函数必须将函数名作为变量进行声明，并将计算的结果赋给这个函数名同名变量。一个完整的例子如下示例 8 所示。

:::tip 小提示
函数副程序只能返回一个结果，而子程序可以返回多个结果。所以如果只是用来计算某个公式或者求解某个结果，可以优先采用函数副程序。如果需要同时返回多个变量，则优先采用子程序。
:::

```fortran
!!! 示例 8
function square(x)
    implicit none
    real square, x         ! 声明函数名同名变量
    square = x*x           ! 将计算结果赋给函数名同名变量
end function square

program ftest1
    implicit none
    real x, y, square      ! 声明使用的函数名同名变量
    x = 4.0
    y = 3.0*square(x+1.0) + 50.5
    print *, x, y
end program ftest1

!!! 执行结果
>>>   4.00000000       125.500000
```

:::tip 小提示
Fortran 中的函数使用需要严格遵守函数名同名变量在主程序和函数中的相同类型声明，否则就无法通过编译。
:::

## 全局变量

虽然我们在不同的子程序中使用同名的局部变量不会相互影响，但是有的时候也希望一些变量能在不同的子程序中共享使用，这类变量我们可以称之为**全局变量**。

Fortran 语言中全局变量必须使用 `module` 的方式单独定义。当在主程序或子程序中需要使用这些已定义的全局变量时，首先要使用 `use <module 名>` 来声明引用，并且该声明应在 `implicit none` 之前。如下所示，定义了两个整数类型的变量 nmin 和 nmax，以及实数类型的变量 tinitial 和 二维数组 amatrix。

```fortran
module data1
    integer nmin, nmax
    real tinitial, amatrix(20, 30)
end module data1
```

示例 9 是一个完整的全局变量定义和使用的例子。可以看到，子程序并没有声明任何参数，而是利用定义的全局变量 xais 和 yais 来从主程序中传递值到子程序中。这里的程序执行顺序是：**主程序 → 调用子程序 → 子程序中的打印 → 子程序修改 yais 变量 → 主程序中的打印 → 程序结束**。所以最终的执行结果的第一行是子程序中打印还未修改的两个全局变量，而第二行是主程序中打印已被子程序修改的两个全局变量，符合预期效果。

```fortran
!!! 示例 9
module global
    real xais, yais
end module global

program stest4
    use global
    implicit none
    xais = 5.0
    yais = 100.0
    call subr4
    print *, xais, yais
end program stest4

subroutine subr4
    use global
    implicit none
    print *, xais, yais
    yais = 25.0
end subroutine subr4

!!! 执行结果
>>>   5.00000000       100.000000    
>>>   5.00000000       25.0000000
```

:::tip 小提示
有的时候子程序中可能并不需要 module 中定义的所有全局变量，只想引入几个有关的全局变量。在 Fortran 语言中可以用 `only` 的语法来限定引入的全局变量，如下所示。

```fortran
use 模块名, only : 变量1, 变量2, ...
use global, only : yaxsis
```
:::

## 混合嵌套调用

一般地，子程序或者函数的参数都是一些来自主程序的局部变量，那么子程序中调用函数是否也需要在参数中进行声明呢？是的，子程序如果想要使用某个函数，需要将函数名作为参数引用。

```fortran
!!! 示例 10
subroutine subrout(subr, xmin, xmax, n)
    implicit none
    real xmin, xmax, dx, y
    integer n, i
    dx = (xmax - xmin)/n
    do i = 0, n
        call subr(dx*i+xmin, y)
        print *, i, y
    enddo
end subroutine subrout

subroutine funcout(fun, xmin, xmax, n)
    implicit none
    real fun, xmin, xmax, x, dx, y
    integer n, i
    dx = (xmax-xmin)/n
    do i = 0, n
        x = dx*i + xmin
        y = func(x)**3
        print *, x, y
    enddo
end subroutine funcout

subroutine sub(x, y)
    implicit none
    real y, x
    y = 2*sin(x) + cos(x**2)
end subroutine sub

function fun(x)
    implicit none
    real fun, x
    fun = sin(x)**3
end function fun

program test_func
    implicit none
    real, external :: fun
    external sub
    call subrout(sub, 0.0, 3.0, 10)
    call funcout(fun, 0.0, 3.0, 10)
end program test_func

!!! 执行结果
>>>        0   1.00000000    
           1   1.58699322    
           2   2.06518173    
           3   2.25615215    
           4   1.99450183    
           5   1.36681640    
           6  0.952533364    
           7   1.42861772    
           8   2.21715832    
           9   1.38931477    
          10 -0.628890276    
   0.00000000       0.00000000    
  0.300000012       1.71903503E-05
  0.600000024       5.83394058E-03
  0.900000036      0.111042053    
   1.20000005      0.530770957    
   1.50000000      0.977679431    
   1.80000007      0.787805617    
   2.10000014      0.266100109    
   2.40000010       2.92694476E-02
   2.70000005       4.75692534E-04
   3.00000000       2.21971472E-08
```

上面的示例 10 是子程序和函数副程序的混合嵌套使用的一个范例，上述代码的主要结构如下所示：在主程序 `test_func` 中调用子程序 `subrout` 和 `funcout`，再由子程序 `subrout` 调用子程序 `sub` 以及子程序 `funcout` 调用函数副程序 `fun`。

```bash
test_func（主程序）
├── subrout（子程序）
│   └── sub（子程序）
└── funcout（子程序）
    └── fun（函数副程序）
```

:::tip 小提示
这里比较重要的是，在主程序中需要对递归调用的子程序和函数副程序进行声明。主程序中的递归子程序调用声明只需要 `external` 加上子程序名即可，而主程序中的递归函数副程序调用声明需要同时定义函数变量和函数名，因此写为 `real, external ::` 加上函数副程序名。

当然在直接调用函数副程序 `fun` 的子程序 `funcout` 中也需要定义函数同名变量，写为 `real fun`。
:::