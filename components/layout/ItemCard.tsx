"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { ItemCardProps } from "@/types/ui";

const badgeColors = {
  green:
    "text-green-700 dark:text-green-300 ring-green-700/20 dark:ring-green-500/30",
  blue: "text-blue-700 dark:text-blue-300 ring-blue-700/20 dark:ring-blue-500/30",
  red: "text-red-700 dark:text-red-300 ring-red-700/20 dark:ring-red-500/30",
  yellow:
    "text-yellow-700 dark:text-yellow-300 ring-yellow-700/20 dark:ring-yellow-500/30",
  purple:
    "text-purple-700 dark:text-purple-300 ring-purple-700/20 dark:ring-purple-500/30",
  gray: "text-gray-700 dark:text-gray-300 ring-gray-700/20 dark:ring-gray-500/30",
};

export default function ItemCard({
  title,
  linkHref,
  icon,
  badges = [],
  description,
  date,
  className = "",
  actions,
  dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
}: Readonly<ItemCardProps>) {
  return (
    <Card className={`p-6 relative glass-card glass-card-hover ${className}`}>
      {actions && <div className="absolute top-4 right-4">{actions}</div>}

      <div className="pr-8 space-y-2">
        {(icon || badges.length > 0) && (
          <div className="flex items-center gap-3">
            {icon}

            {badges.map((badge, index) => (
              <span
                key={`badge-${badge.label}-${index}`}
                className={`inline-flex items-center truncate rounded-full glass-badge ${
                  badgeColors[badge.color]
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        <Link
          href={linkHref}
          className="block font-medium hover:underline hover:underline-offset-4 transition-all"
          title={title}
        >
          <h3 className="font-medium glass-card-title truncate">{title}</h3>
        </Link>

        {(description || date) && (
          <div className="text-xs glass-card-description">
            {description && <p className="truncate">{description}</p>}
            {date && (
              <p className="truncate">
                {description ? "Created on " : ""}
                {new Date(date).toLocaleDateString("en-US", dateFormat)}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
