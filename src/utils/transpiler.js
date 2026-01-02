export const TEMPLATES = {
  python: `# 🐍 Python Mode
head = Node(10)
head.next = Node(20)
head.next.next = Node(30)
`,
  java: `// ☕ Java Mode
Node head = new Node(10);
head.next = new Node(20);
head.next.next = new Node(30);
`,
  cpp: `// 🚀 C++ Mode
Node* head = new Node(10);
head->next = new Node(20);
head->next->next = new Node(30);
`
};

export function transpileToPython(code, language) {
  if (language === "python") return code;

  let pyCode = code;

  // 1. Remove Semicolons (Common in Java/C++)
  pyCode = pyCode.replace(/;/g, "");

  // 2. Handle C++ Pointers
  if (language === "cpp") {
    // Replace '->' with '.'
    pyCode = pyCode.replace(/->/g, ".");
    // Remove 'Node*' type declarations
    pyCode = pyCode.replace(/Node\*\s+/g, "");
  }

  // 3. Handle Java/C++ 'new' keyword
  // 'new Node(5)' -> 'Node(5)'
  pyCode = pyCode.replace(/new\s+Node/g, "Node");

  // 4. Handle Variable Declarations (Node head = ...)
  // Remove 'Node ' at the start of lines
  pyCode = pyCode.replace(/(^|\n)\s*Node\s+/g, "$1");

  // 5. Remove Type Definitions (int, void, etc - basic support)
  pyCode = pyCode.replace(/\bint\s+/g, "");
  pyCode = pyCode.replace(/\bvoid\s+/g, "");

  return pyCode;
}