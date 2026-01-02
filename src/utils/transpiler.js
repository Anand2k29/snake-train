export const TEMPLATES = {
  python: `# 🐍 Python Mode
# Write your code below:
head = Node(10)
head.next = Node(20)
`,
  java: `// ☕ Java Mode
// Write your code below:
Node head = new Node(10);
head.next = new Node(20);
`,
  cpp: `// 🚀 C++ Mode
// Write your code below:
Node* head = new Node(10);
head->next = new Node(20);
`
};

export function transpileToPython(code, language) {
  if (language === "python") return code;

  let pyCode = code;

  // 1. Remove Single Line Comments (// ...)
  // This fixes the "Invalid Character" error!
  pyCode = pyCode.replace(/\/\/.*$/gm, "");

  // 2. Remove Semicolons
  pyCode = pyCode.replace(/;/g, "");

  // 3. Handle C++ Pointers
  if (language === "cpp") {
    pyCode = pyCode.replace(/->/g, ".");
    pyCode = pyCode.replace(/Node\*\s+/g, ""); // Remove Node* type
  }

  // 4. Handle Java/C++ 'new' keyword
  pyCode = pyCode.replace(/new\s+Node/g, "Node");

  // 5. Handle Type Declarations (Node head = ...)
  // Removes 'Node ' at the start of a line or after a newline
  pyCode = pyCode.replace(/(^|\n)\s*Node\s+/g, "$1");

  // 6. Remove 'int', 'void' (Simple cleanup)
  pyCode = pyCode.replace(/\bint\s+/g, "");
  pyCode = pyCode.replace(/\bvoid\s+/g, "");

  return pyCode;
}