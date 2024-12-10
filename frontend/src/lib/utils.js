import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseMessage(message) {
  const parts = [];
  let currentPart = null;
  let buffer = "";
  let i = 0;

  while (i < message.length) {
    const char = message[i];

    if (char === "<" && !currentPart) {
      if (buffer.trim()) {
        parts.push({ type: "text", data: buffer.trim() });
        buffer = "";
      }

      const tagEnd = message.indexOf(">", i);
      if (tagEnd === -1) {
        buffer += char;
        i++;
        continue;
      }

      const tag = message.slice(i + 1, tagEnd);
      console.log("tag.......", tag)
      if (tag.startsWith("thinking")) {
        currentPart = { type: "thought", data: "" };
        i = tagEnd + 1;
      } else if (tag.startsWith("artifact")) {
        const data = {
          generating: true,
          id: null,
          type: null,
          title: null,
          content: "",
          language: null,
        };
        const attributeRegex = /(\w+)="([^"]*)"/g;
        let match;
        while ((match = attributeRegex.exec(tag)) !== null) {
          const [, key, value] = match;
          if (key === "identifier") data.id = value;
          else if (key === "type") data.type = value;
          else if (key === "title") data.title = value;
          else if (key === "language") data.language = value;
        }
        currentPart = { type: "artifact", data };
        i = tagEnd + 1;
      } else {
        buffer += char;
        i++;
      }
    } else if (currentPart) {
      const closingTag =
        currentPart.type === "thought" ? "</thinking>" : "</artifact>";
      const closingIndex = message.indexOf(closingTag, i);

      if (closingIndex !== -1) {
        const content = message.slice(i, closingIndex);
        if (currentPart.type === "thought") {
          currentPart.data = content;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = content;
          currentPart.data.generating = false;
        }
        parts.push(currentPart);
        currentPart = null;
        i = closingIndex + closingTag.length;
      } else {
        // If no closing tag is found, treat the rest of the message as content
        const remainingContent = message.slice(i);
        if (currentPart.type === "thought") {
          currentPart.data = remainingContent;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = remainingContent;
        }
        parts.push(currentPart);
        break;
      }
    } else {
      buffer += char;
      i++;
    }
  }

  if (buffer.trim()) {
    parts.push({ type: "text", data: buffer.trim() });
  }

  return combineTextParts(parts);
}

function combineTextParts(parts) {
  const combinedParts = [];
  let currentTextContent = "";

  for (const part of parts) {
    if (part.type === "text") {
      currentTextContent += (currentTextContent ? " " : "") + part.data;
    } else {
      if (currentTextContent) {
        combinedParts.push({ type: "text", data: currentTextContent });
        currentTextContent = "";
      }
      combinedParts.push(part);
    }
  }

  if (currentTextContent) {
    combinedParts.push({ type: "text", data: currentTextContent });
  }

  return combinedParts;
}

export function extractSlidesJSON(code) {
  // Regular expression to match the slides array
  const slidesRegex = /const\s+slides\s*=\s*(\[[\s\S]*?\]);/;

  // Find the slides array in the code
  const match = code.match(slidesRegex);

  if (!match) {
    throw new Error("Slides array not found in the provided code.");
  }

  // Extract the slides array string
  const slidesArrayString = match[1];

  try {
    // Parse the slides array string to JSON
    const slidesJSON = JSON.parse(slidesArrayString);
    return slidesJSON;
  } catch (error) {
    throw new Error("Failed to parse slides JSON: " + error.message);
  }
}