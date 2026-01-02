# 🐍 Snake Train: Interactive Linked List Visualizer

> **A real-time educational tool to visualize Data Structures (Linked Lists) using Python code.**

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)
![Pyodide](https://img.shields.io/badge/Pyodide-Python_in_Browser-yellow)

## 📖 About The Project

**Snake Train** (also known as NeurAL-Viz) is a web-based visualizer designed to help students understand Linked Lists. Unlike static diagrams, this tool allows you to write actual code and see the nodes connect, disconnect, and loop in real-time.

It runs **Python** directly in the browser using [Pyodide](https://pyodide.org/), meaning no backend server is required for code execution.

### ✨ Key Features
- **Live Code Execution:** Type Python code and watch the Visualizer update instantly.
- **Interactive Graphs:** Drag and drop nodes to rearrange them visually using **React Flow**.
- **Preset Examples:** Learn quickly with built-in templates (Singly, Doubly, Circular, Cycles, Intersections).
- **Multi-Language UI:** Interfaces for Python, Java, and C++.
- **Neo-Brutalism UI:** A clean, high-contrast design for better focus.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Visualization:** [React Flow](https://reactflow.dev/)
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Engine:** [Pyodide](https://pyodide.org/) (WebAssembly Python)
- **Styling:** Tailwind CSS

---

## 🚀 Roadmap

We are actively working on expanding language support!
- [x] **Python Support** (Fully Functional)
- [ ] **Java Support** (Coming Soon - via Transpiler)
- [ ] **C++ Support** (Coming Soon - via Transpiler)

> *See Issue #1 for details on the Multi-Language implementation plan.*

---

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
