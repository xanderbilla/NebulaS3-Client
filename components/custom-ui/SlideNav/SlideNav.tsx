"use client";
import SlideNavOverlay from "./SlideNavOverlay";
import SlideNavPanel from "./SlideNavPanel";

export default function SlideNav({
  isOpen,
  setIsOpen,
}: {
  readonly isOpen: boolean;
  readonly setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <>
      <SlideNavOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SlideNavPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
