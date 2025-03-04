import Footer from "@/components/footer";
import Navbar from "@/components/home-page/navbar";
import React from "react";

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
