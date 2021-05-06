---
sidebar_position: 1
---

# 前言

## Fortran 语言

### 简介

Fortran (**For**mula **Tran**slation 的缩写) 语言是 1957 年由 IBM 开发、世界上第一个被正式采用并流传至今的高级编程语言。它是为了满足数值计算的需求而发展出来的，广泛应用于科学和工程计算，受到了广大研究者、工程人员、师生的喜爱。Fortran 语言标准从最初发展到现在最新的 Fortran 2018，越来越多的高级特性被加入，与其他现有的面向对象的高级编程语言几乎无异。不过说到底，Fortran 语言在数值计算上的性能和计算代价相对其他高级编程语言来说始终更具优势，甚至有人将 Fortran 语言比喻成高性能计算专用的程式语言。

### 发展

- 诞生（1957 年）：应用于 IBM 704 系统上，包含 32 种基本语句。
- Fortran II（1958 年）：推出函数功能，同时添加对复数等数据类型的支持。
- Fortran III（1958 年后）：由于这个版本可移植性差，仅开发但从未推出。
- Fortran IV（1962 年）：新增布尔类型、逻辑 IF 语句 等功能，应用在 IBM 7030 等系统上。
- Fortran 66（1966 年）：第一套工业标准版的 Fortran，完整的高级编程语言。
- Fortran 77（1978 年）：成为具有结构化特性的编程语言，广泛应用于科学和工程计算。
- Fortran 90（1992 年）：新增了许多编程上的新特性，更加简化高效。
- Fortran 95（1995 年）：加入面向对象的理念和提供指针，同时增强了数组。
- Fortran 2003（2003 年）：大幅度改版，支持继承、多态等高级编程语言特性，与 C 交互更方便。
- Fortran 2008（2007 年）：小改版，增强了数学函数、数组的支持。
- Fortran 2018（2018 年）：增强并行特性以及与 C 交互能力。

:::tip 小提示

本文档涉及到的所有内容均是以 Fortran 95 为基准进行实践测试。

:::

## 文档相关

### 起因

由于个人研究需要，想要从零出发入门 Fortran 语言，并且尝试参与到研究组里使用 Fortran 语言编写的第一性原理计算的开源项目 [CONQUEST](http://order-n.org)。其实，国内外关于 Fortran 语言的教程或者书籍也比较多而且也比较全面。无论是中科大丁老师的中文在线教程，还是 NAG 日本官网上的日文在线教程，都能够很快入门并实践。但是想通过这样一种方式把自己入门学习 Fortran 的过程记录下来，既可以当做是手册忘记了就来查，又可以分享一些有趣的实践，希望自己能学得更深更扎实。

### 目录

- 入门篇
    - [安装](./tutorial-basics/install)
    - [基础知识](./tutorial-basics/basic)
    - [条件语句](./tutorial-basics/condition)
    - [子程序](./tutorial-basics/subroutine)
    - [输入输出](./tutorial-basics/fileio)
    - [语法](./tutorial-basics/grammar)
    - [文本](./tutorial-basics/text)
    - [行列式计算](./tutorial-basics/determinant)
- 实践篇
    - [练习一](./tutorial-extras/practice01)
    - [练习二](./tutorial-extras/practice02)

## 版权申明

![知识共享许可协议](https://i.creativecommons.org/l/by-sa/4.0/88x31.png) 

本文档采用 [知识共享署名-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-sa/4.0/) 进行许可。

如有发现有误之处或者有版权争议的内容，请不吝联系笔者 zhonger <zhonger[at]live.cn> (请将 [at] 换成 @)，或者也可以通过 [新建 issue](https://github.com/zhonger/fortran-tutorial/issues/new) 的方式提出问题。

## 参考资料

整个文档的编写过程中，笔者参考了以下资料，但仍有可能存在资料未在此列举。在此，向各位原作者致以谢意。

- [Fortran Wikipedia](https://zh.wikipedia.org/wiki/Fortran)
- [Fortran for Scientists and Engineers, Fourth Edition](http://www.academicos.ccadet.unam.mx/mario.gonzalez/cursos_archivos/mn/Chapman.pdf)
- [Fortran 官网：入门教程 (英文)](https://fortran-lang.org/learn/quickstart)
- [NAG 日本官网：Fortran 入门教程 (日文)](https://www.nag-j.co.jp/fortran/FI_1.html#AboutFortranLanguage)
- [Fortran ハンドブック 田口 俊弘 (日文)](https://www.amazon.co.jp/Fortran-%E3%83%8F%E3%83%B3%E3%83%89%E3%83%96%E3%83%83%E3%82%AF-%E7%94%B0%E5%8F%A3-%E4%BF%8A%E5%BC%98/dp/4774175064)
- [Fortran 77 和 90/95 编程入门 丁泽军编](https://micro.ustc.edu.cn/Fortran/ZJDing/)
- [中国科学技术大学 Fortran 资源目录](http://micro.ustc.edu.cn/Fortran/)