---
sidebar_position: 2
---

# 基础知识

## 主函数

一个完整的 Fortran 代码，一般来说是以 `program code_name` 开始、以 `end program code_name` 结束的首末声明，变量声明以及需要执行的命令或者操作三个部分组成。通用的 Fortran 代码文件的文件后缀可以是 `.f90`、`.f`、`.g95` 等等，但通常为了统一和适应不同版本的 Fortran 编译环境建议采用 `.f90` 后缀。和 C、C++ 语言比较类似，Fortran 代码也是通过编译执行。比如对如下所示的示例代码执行 `gfortran code_name.f90 -o code_name` 即可生成可执行程序 `code_name`，再执行 `./code_name` 则会输出代码执行结果如下。

```fortran title="code_name.f90"
program code_name
    implicit none
    real x, y, z
    x = 2
    y = 3
    z = x + y * 5
    print *, x, y
    print *, 'z = ', z 
end program code_name
```

```shell
   2.00000000       3.00000000    
 z =    17.0000000
```

:::tip 小提示
这里我们发现在上面给出的示例代码中有一行 `implicit none`，明明本来的代码已经符合三个部分了，为什么要多加这一行呢？这是因为在旧 Fortran 中存在隐式类型声明，为了规避在 Fortran 95 以后的版本中可能出现错误，特意在每个开头声明之后都加上这么一行。这样我们在写代码的过程中如果使用到了未提前声明或者打错字符的变量名，编译程序就会报错告知我们。这对于形成良好的代码习惯和增强代码可维护性有很大的帮助，因此此行声明必不可少。
:::

## 运算符

Fortran 语言和别的高级编程语言一样，都拥有完整的运算符，包括简单的加减乘除、复杂的乘方等运算。如下表所示是 Fortran 语言中的运算符的写法和使用方法，其中运算符的计算优先顺序与数学计算中一致：**乘方运算 > 乘除运算 > 加减运算**。

| 运算符 | 运算含义 | 示例 | 数学含义 |
| :--: | :--: | :--: | :--: |
| + | 加 | x+y | x 与 y 的和 |
| - | 减 | x-y | x 与 y 的差 |
| * | 乘 | x*y | x 与 y 的积 |
| / | 除 | x/y | x 与 y 的商 |
| ** | 乘方 | x**y | x 的 y 次方 |
| - | 负 | -x  | x 的负数 |

## 数据类型与变量声明

Fortran 语言的数据类型比较简单，没有像其他高级编程语言那样分得那么细，主要分为**整数型**和**实数型**两个大类。整数型的计算与 C、C++、Python 中有点类似，整数与整数的商还是一个整数。即使当不整除的时候，为了保持结果和参与运算的变量类型一致 Fortran 编译器会只取正常数学运算结果的整数部分，如下示例所示。实数型其实与数学意义上的实数是一致的，既包括整数也包括小数，所以当不整除的除法中的两个变量有一个为实数型时，Fortran 编译器会将两个变量类型对应成实数型并计算出正常的带小数的结果，如下示例所示。

因为所有变量都要在使用之前声明类型，所以当属于同一种类型时我们可以按照下面那样写在同一行，不同变量之间用逗号分隔开。为了代码美观，建议在逗号与后一个变量名之间留一个空格。

```fortran
!!! 两个整数型相除
integer x, y
x = 2
y = 3
print *, x/y   ! 结果为 0
print *, y/x   ! 结果为 1

!!! 被除数为实数型，除数为整数型
real m 
integer n 
m = 10
n = 3
print *, m/n   ! 结果为  3.33333325

!!! 被除数为整数型，除数为实数型
integer m 
real n 
m = 10
n = 3
print *, m/n   ! 结果为  3.33333325

!!! 被除数和除数均为实数型
real m, n
m = 10
n = 3
print *, m/n   ! 结果为  3.33333325
```

实际上，Fortran 语言除了整数型和实数型两个大类之外，还有一些小类，比如说复数类型、布尔类型、字符串类型。因为操作系统一般使用实数型或者复数类型时都默认采用单精度，如果需要使用双精度则需要特殊声明。所有数据类型总结如下：

| 数据类型 | 标识符 | 示例 |
| :--: | :--: | :--: |
| 整数型 | integer | 2 |
| 实数型 | real | 2.0 |
| 双精度实数型 | double precision | 2.0 |
| 复数型 | complex | (1.0, 2.0) |
| 双精度复数型 | complex(kind(0d0)) | (1.0, 2.0) |
| 布尔型 | logical | true/false |
| 字符串型 | character | "Text" |

:::tip 小提示
这里有一点值得十分注意：一个 Fortran 文件的变量声明必须在最开始，如果多个变量声明行之间掺杂了其他的操作行或者命令行，则后续的变量声明将会无效，在编译的过程中就会直接报错。
:::

## 数学函数

Fortran 既然是为数值计算而生的，那么自然就包含了对初等数学函数和数据类型变化函数的完整支持。如下表所示为有关初等数学函数的写法和用法。

| 写法 | 函数名称 | 数学表达 | 必要条件 | 函数值的范围 |
| :--: | :--: | :--: | :--: | :--: |
| sqrt(x) | 平方根 | $\sqrt{x}$ | $x \geqq 0$ |  |
| sin(x) | 正弦函数 | $\sin x$ |  |  |
| cos(x) | 余弦函数 | $\cos x$ |  |  |
| tan(x) | 正切函数 | $\tan x$ |  |  |
| asin(x) | 反正弦函数 | $\sin^{-1}x$ | $-1\leqq x \leqq 1$ | $-\frac{\pi}{2} \leqq f \leqq \frac{\pi}{2}$ |
| acos(x) | 反余弦函数 | $\cos^{-1}x$ | $-1\leqq x \leqq 1$ | $0 \leqq f \leqq \pi$ |
| atan(x) | 反正切函数 | $\tan^{-1}x$ |  | $-\frac{\pi}{2} < f < \frac{\pi}{2}$ |
| atan2(y, x) | 反正切函数 | $\tan^{-1}(y/x)$ |  | $-\pi < f < \pi$ |
| exp(x) | 指数函数 | $e^x$ |  |  |
| log(x) | 对数函数 | $\log_{e}x$ | $x > 0$ |  |
| log10(x) | 常用对数函数 | $\log_{10}x$ | $x > 0$ |  |
| sinh(x) | 双曲正弦函数 | $\sinh x$ |  |  |
| cosh(x) | 双曲余弦函数 | $\cosh x$ |  |  |
| tanh(x) | 双曲正切函数 | $\tanh x$ |  |  |

下表为有关数据类型变化函数的写法和用法。

| 写法 | 函数名称 | 输入类型 | 输出类型 | 函数的含义 |
| :--: | :--: | :--: | :--: | :--: |
| real(n) | 实数化 | 整数 | 实数 | 变成实数型 |
| abs(n) | 绝对值 | 整数 | 整数 | $n$ 的绝对值 |
| mod(m, n) | 求余 | 2个整数 | 整数 | $m$ 对 $n$ 求余 |
| int(x) | 整数化 | 实数 | 整数 | 变成整数型(去尾) |
| nint(x) | 整数化 | 实数 | 整数 | 变成整数型(四舍五入) |
| sign(x, s) | 符号变更 | 实数 | 实数 | $s \geqq 0, \lvert x \rvert; s < 0, -\lvert x \rvert$ |
| abs(x) | 绝对值 | 实数或复数 | 实数 | $x$ 的绝对值 |
| mod(x, y) | 求余 | 2个实数 | 实数 | $x$ 对 $y$ 求余 |
| real(z) | 复数的实部 | 复数 | 实数 | $z$ 的实部 |
| imag(z) | 复数的虚部 | 复数 | 实数 | $z$ 的虚部 |
| cmplx(x, y) | 复数化 | 两个实数 | 复数 | $x+iy$ |
| conjg(z) | 共轭复数 | 复数 | 复数 | $z$ 的共轭复数 |

## 打印输出

Fortran 的打印输出其实已经在前面的示例代码中已经提到了，就是所谓的 `print` 语句。`print` 语句必须紧接着 `*`，其含义是按照标准格式输出，如果缺失这个的话在编译时就会报出 `Error: Expected comma in I/O list at (1)` 的错误。正确的打印输出示例代码如下：

```fortran live
integer n
n = 2
print *, 1+2, n, n-1, n/1, n**2
```

输出结果如下：

```shell
           3           2           1           2           
```

如果需要和其他高级编程语言那样在输出的过程中加入字符串到其中，则按如下设置：

```fortran
real m
m = 5
print *, 'm = ', m, '  m*2 = ', m*2
print *, 'm = ',m, '  m*2 = ',m*2
```

输出结果如下：

```shell
m =    5.00000000       m*2 =    10.0000000
m =    5.00000000       m*2 =    10.0000000
```

根据以上输出结果我们可以看出，`m` 与 `=` 之间的一个空格与实际输出时是一致的，而输出变量 `m` 时不管与前一个逗号之间是否有空格，输出结果都不会发生改变，都存在超过一个以上的空格。实际上，这也是 Fortran 编译器为了能够区分输出内容，而特意在标准输出时对逗号分割的内容上添加这样的空格。不过为了代码阅读上的美观，建议在代码编写时还是保持变量与逗号之间的一个空格。

:::tip 小提示
这里输出字符串的时候引用字符串的符号可以使用`'`，也可以使用`"`。本质上没有什么区别，只是需要成对使用，不然就会报错。
:::

## 数组

### 数组的定义

前面我们所介绍的有关数据类型基本上能够涵盖一般的日常使用，但是对于科研人员来说，矩阵、行列式等等才是计算过程中不可缺少的数据类型。为此，Fortran 也有了数组一样的数据类型来支持这一需求。如下所示，我们可以直接采用原有的整数型、实数型和复数型定义数组。当括号中只有一个数字时，表示是一维数组；当括号中有逗号分割的两个数字时，表示是二维数组；三维数组以此类推。二维数组可以用于表示我们所熟知的矩阵、行列式等数据类型。

```fortran
integer m(10)         ! 长度为 10 的整数型数组
real x(20), y(4, 5)   ! 长度为 20 的实数型数组， 4 行 x 5 列的二维实数型数组
complex matrix(5, 5)  ! 5 行 x 5 列的二维复数型数组
```

:::tip 小提示
这里需要注意的是，在定义数组的时候不仅可以用正整数，也可以用负整数和 0。比如 `real n(-3:5)` 表示定义一个长度为 9、序号从 -3 到 5 (包括 0)的一维数组，`real m(-2:1, 0:4)` 表示定义一个 4 行 x 5 列、行序号从 -2 到 1、列序号从 0 到 4 的二维数组。一般来说，为了与实际数学运算中的理解保持一致，建议采用正整数来定义数组更加方便。
:::

### 数组元素的选取

既然定义了数组，那么我们就需要有对于数组的增加、选择这样的基本操作。Fortran 数组中的序号是从 1 开始的，即写作 n(1)，这点与其他高级编程语言略有不同，不过符合人类的数学认识。因此如下所示，当定义一个长度为 10 的数组 n 时，数组 n 的最后一个元素就是 n(10)。在实际的存储中，我们能够很容易理解一维数组是按照 1 到 10 的顺序从左往右排列的，但是在二维数组中又会是怎么样呢？是行优先还是列优先呢？一般来说，在我们接触过的高级编程语言中几乎都是行优先的，即先存储第一行再存储第二行，以此类推。但是，在 Fortran 中则是**列优先**的，也就是说 Fortran 的二维数组存储时会先存储第一列再存储第二列，再以此类推。

```fortran
real n(10)     ! n(1) ~ n(10)
real m(4, 4)   ! m(1, 1) m(2, 1) m(3, 1) ... m(4, 4)
```

:::tip 小提示
如果我们在使用数组 n 的过程中忘记了加上序号，那么程序默认就会对整个数组的全部元素进行操作，而非像其他高级编程语言可能会指向数组的第一个元素。
:::

当我们想要去选取数组中的某一个元素时，可以直接通过对应的序号进行选取。但是如果想要选多个元素或者某一行、某一列时，这就有点不同了。比如说，现在有一个长度为 10 的一维数组 n，我们想要获取到从第 3 个元素到第 5 个元素的 3 个元素，应该使用 `:` 来将序号的上下限分隔开同时选中，即 n(3:5)。如果有一个 3 行 x 4 列 的二维数组 m，我们想要获取到第 2 行到第 3 行的所有元素，则应该使用 m(2:3, 1:4) 来选取。

## 跨行与注释

有的时候我们编写的计算式可能会比较长，这个时候为了代码和公式的高可阅读性，我们通常采用 Fortran 语言所提供的跨行功能。比如说如下所示的原打印输出，就可以在中途使用 `&` 符号来声明下一行是前一行的后续，这样的执行结果是一致的。

```fortran
print *, zhang, qian, sun, li, zhou, wu, zhen, wang

!!! 可以换成
print *, zhang, qian, sun, li &
       , zhou, wu, zhen, wang
```

上面的例子是变量的跨行输出，如果是一个长字符串，也是可以使用一样的方式的，只是需要在中断的前一行末尾和下一行开头同时加上 `&` 符号，如下所示。

```fortran
print *, 'Fortran is so good for the scientific calculation.'

!!! 可以换成
print *, 'Fortran is so good &
          &for the scientific calculation.'
```

我们之前在定义变量的时候已经提过，为了代码整洁性可能会同时将同一类型的变量放置在同一行，之间用逗号分割即可。如果是在给变量赋值的时候，是不是也能够将赋值式放置在同一行呢？原则上来说，如果赋值式比较短的话，是可以将多行赋值式缩短在同一行的，它们之间使用 `;` 进行连接。这里值得注意的是，最后一个赋值式后面一定不要多加 `;`，如下所示。

```fortran
!!! 修改前
x = 3
y = 4
z = 5

!!! 修改后
x = 3; y = 4; z = 5
```

Fortran 语言中的注释其实在上面的内容中也已经接触到了，`!` 之后的内容将会被 Fortran 编译器认为是注释内容。一般来说，一个 `!` 的注释其实就已经足够了，但是为了区分行注释与行末注释，建议在行注释的时候使用三个 `!`，而在行末注释时使用一个 `!`。当然如果存在相邻多行同时进行注释，或者在一个可视窗口内有多个行末注释，建议协调成同一列以增强代码整洁性。