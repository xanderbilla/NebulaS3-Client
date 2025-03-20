"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
  className?: string;
  children?: ReactNode;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  variant = "destructive",
  className = "",
  children,
}: ConfirmDialogProps) {
  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xl transition-all duration-300" />
      )}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`glass-card backdrop-blur-2xl bg-black/30 border-[0.5px] border-white/10 shadow-2xl z-50 ${className}`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="glass-hover border-none"
            >
              {cancelText}
            </Button>
            <Button
              variant={variant}
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="glass-hover"
            >
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
