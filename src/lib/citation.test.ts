import { describe, expect, it } from "vitest";
import { formatCitation, parseName, type CitableWork } from "./citation";

const article: CitableWork = {
  title: "A study of testing",
  authors: ["Jane A. Smith", "Chen, Wei", "Ade Okafor"],
  year: 2024,
  type: "JOURNAL_ARTICLE",
  status: "PUBLISHED",
  venue: "Journal of Tests",
  volume: "12",
  issue: "3",
  pages: "45-67",
  doi: "10.1000/xyz123",
};

describe("parseName", () => {
  it("handles both name orders", () => {
    expect(parseName("Jane A. Smith")).toEqual({ family: "Smith", given: ["Jane", "A"] });
    expect(parseName("Chen, Wei")).toEqual({ family: "Chen", given: ["Wei"] });
  });
});

describe("formatCitation", () => {
  it("formats APA", () => {
    expect(formatCitation(article, "APA")).toBe(
      "Smith, J. A., Chen, W., & Okafor, A. (2024). A study of testing. Journal of Tests, 12(3), 45–67. https://doi.org/10.1000/xyz123",
    );
  });
  it("formats IEEE", () => {
    expect(formatCitation(article, "IEEE")).toBe(
      'J. A. Smith, W. Chen, and A. Okafor, "A study of testing," Journal of Tests, vol. 12, no. 3, pp. 45–67, 2024, doi: 10.1000/xyz123.',
    );
  });
  it("formats Harvard", () => {
    expect(formatCitation(article, "Harvard")).toBe(
      "Smith, J.A., Chen, W. and Okafor, A. (2024) 'A study of testing', Journal of Tests, 12(3), pp. 45–67. doi:10.1000/xyz123.",
    );
  });
  it("formats Vancouver", () => {
    expect(formatCitation(article, "Vancouver")).toBe(
      "Smith JA, Chen W, Okafor A. A study of testing. Journal of Tests. 2024;12(3):45–67. doi:10.1000/xyz123",
    );
  });
  it("omits missing metadata instead of inventing it", () => {
    const sparse: CitableWork = { title: "Untitled", authors: [], year: 2020, type: "OTHER", status: "SUBMITTED" };
    const text = formatCitation(sparse, "APA");
    expect(text).toBe("(2020). Untitled. (manuscript submitted for publication).");
    expect(text).not.toMatch(/undefined|null/);
  });
});
