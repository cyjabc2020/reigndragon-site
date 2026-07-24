import type { Metadata } from "next";

// Hidden, unlisted page. Reachable only via its exact obscure URL.
// Kept out of the navigation and excluded from search-engine indexing.
export const metadata: Metadata = {
  title: "Document",
  description: "Document.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const DOC_PDF = "/doc-8f3a1c7e9b.pdf";

export default function DocumentPage() {
  return (
    <div className="bg-grid min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-8 sm:pt-32">
        <p className="text-lg mb-8">
          <a
            href={DOC_PDF}
            className="text-accent underline underline-offset-4 hover:opacity-80"
            download
          >
            Download the document
          </a>
        </p>

        <div className="overflow-hidden rounded-lg border border-white/10 shadow-lg">
          <object
            data={DOC_PDF}
            type="application/pdf"
            className="w-full"
            style={{ height: "85vh", minHeight: "600px" }}
          >
            <div className="p-8 text-center text-text-secondary">
              <p>
                Your browser can&apos;t display the embedded PDF.{" "}
                <a
                  href={DOC_PDF}
                  className="text-accent underline underline-offset-4"
                  download
                >
                  Download the document instead.
                </a>
              </p>
            </div>
          </object>
        </div>
      </section>
    </div>
  );
}
