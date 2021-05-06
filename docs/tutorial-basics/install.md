---
sidebar_position: 1
---

# 安装与使用

Fortran 语言虽然使用的是同一个国际标准，但是存在多个实现版本。我们可以通过浏览 [Fortran 官网-编译器](https://fortran-lang.org/compilers/)了解到 —— Fortran 编译器主要分为开源和商业两个大类，开源类别中以 GNU Fortran (即 gfortran) 和 LLVM Flang 比较流行，商业类别中以 Intel oneAPI (即 ifort) 和 NAG 比较流行。为了更加方便入门和实践，这里我选择了 gfortran 作为示例分别在三种系统中安装 Fortran 编译环境。由于 gfortran 与 gcc 捆绑在一起，所以一般来说安装 gcc 即完成 gfortran 的安装。

## MacOS

由于本人目前的主力工作系统是 MacOS 系统，所以 MacOS 系统上的安装将作为一个重点进行介绍。MacOS 系统版本在 Big Sur 之前，都是可以通过以下的第一种方法直接安装由 Apple 公司提供的 gcc 与 gfortran。但是自从 Big Sur 和 M1 芯片推出之后，截止到目前通过此种方式安装的软件包中只包括 gcc 不含 gfortran。不过我们仍然可以通过第二种 brew 和第三种 macports 的方式来完成快速安装。此处，brew 和 macports 工具本身的具体安装请见参考资料。

### Xcode

```shell
xcode-select --install
```

### Brew

```shell
brew install gcc
```

### MacPort

```shell
sudo port install gcc10
```

### 可执行文件

前往 [fxcoudert/gfortran-for-macOS](https://github.com/fxcoudert/gfortran-for-macOS/releases) 直接下载可执行文件安装。


## Linux

### APT 系列

该系列主要包括 Debian、Ubuntu、Deepin、Mint 等等操作系统发行版。

```shell
# 检查是否已安装 gfortran
which gfortran

# 如果没有任何返回内容，使用 APT 工具安装 gfortran
sudo apt install -y gfortran

# 检查 gfortran 版本
gfortran --version

# 由于 APT 源中可能根据系统版本不同提供的最新 gfortran 版本也不同，可以自定义添加源安装最新 gcc 10
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt update
sudo apt install gfortran-10
```

### RPM 系列

该系列主要包括 Red Hat Linux、CentOS、Fedora、OpenSUSE 等等操作系统发行版。

```shell
# 一般 RPM 系列操作系统安装 gfortran
sudo yum install -y gcc-gfortran

# 自从 Fedora 22 之后 Fedora 默认包管理工具变为 DNF
sudo dnf install -y gcc-gfortran
```

### Arch 系列

该系列主要包括 Archlinux、Manjaro、Antergos 等等操作系统发行版。

```shell
sudo pacman -S gcc-fortran
```

## Windows

由于 gfortran 主要是在 Unix 或 Linux 系统上用，所以 Windows 上安装 gfortran 可能会显得有点麻烦，但也不是没有办法的。

### 集成包安装

在 C/C++ 编程中比较流行的软件 Code::Blocks 提供包括 C/C++/Fortran 在内的一体化 MinGW 安装包，可以通过访问 [下载页面](https://www.codeblocks.org/downloads/binaries/) 获取 `codeblocks-20.03mingw-setup.exe` 安装文件。安装完成后即可编写 Fortran 程序并编译运行。

### WSL

WSL (Windows Subsystem for Linux) 是在 Windows 操作系统上体验 Linux 操作系统的绝佳途径，不需要独立的资源分配，与使用 Linux 虚拟机相比更加方便、高效。可以在 Windows Store 中选择自己习惯的 Linux 发行版本作为子系统，其安装 fortran 的方法与上面 Linux 中的一致。

## 代码编辑器

说到代码编辑器，个人首推 Visual Studio Code (VS Code)。为何是 VS Code 而不是 Sublime Text 或者 Emacs 等等呢？理由很简单，VS Code 不仅支持丰富的 Fortran 语言相关插件、主题，还能够连接远程 Fortran 环境编写代码。这样一来，无论你的主力操作系统是哪一个，还是有多个系统或者多个终端，你都可以使用同一个远程 Linux 服务器上搭建的唯一的 Fortran 编译环境。这也正是未来开发的趋势，开发者只需要有一台足够强大的服务器即可，任何的终端再也不会满足不了开发的资源需求。甚至说，一台拥有足够资源的服务器可以同时共享给多个人使用，也可以通过虚拟化来给开发者提供拥有完全 root 权限的开发环境。

### 插件推荐

- [Modern Fortran ](https://marketplace.visualstudio.com/items?itemName=krvajalm.linter-gfortran)
- [FORTRAN IntelliSense](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
- [Fortran Breakpoint Support](https://marketplace.visualstudio.com/items?itemName=ekibun.fortranbreaker)
- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [Remote](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [fprettify](https://marketplace.visualstudio.com/items?itemName=Blamsoft.fprettify)
- [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

## 参考资料

- [Fortran 官网-安装和使用指南](https://fortran-lang.org/learn/os_setup)
- [Brew 官网](https://brew.sh)
- [MacPorts 官网](https://www.macports.org)
- [Visual Studio Code 官网](https://code.visualstudio.com/)
