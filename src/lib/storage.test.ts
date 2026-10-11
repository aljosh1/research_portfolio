import { describe, expect, it } from "vitest";
import { detectType } from "./storage";

describe("detectType", () => {
  it("recognises PDFs and images by signature", () => {
    expect(detectType(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))?.kind).toBe("pdf");
    expect(detectType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))?.ext).toBe("jpg");
    expect(detectType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))?.ext).toBe("png");
  });
  it("rejects scripts and html disguised as uploads", () => {
    expect(detectType(new TextEncoder().encode("<script>alert(1)</script>"))).toBeNull();
    expect(detectType(new TextEncoder().encode("<svg onload=alert(1)>"))).toBeNull();
  });
});
