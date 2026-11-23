//---------- React ----------
import { useState } from "react";

//---------- Packages ----------
import { Star } from "lucide-react";

//---------- Constants ----------
import { SKILL_RATINGS } from "../constants/workspace";

//---------- Types ----------
import type { SkillRating } from "../types/workspace";

//---------- Utilities ----------
import { cn } from "@/shared/lib/utils";

export default function StarRatingField({ initialRating }: { initialRating?: SkillRating }) {
  const [rating, setRating] = useState(initialRating);

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">Rating</legend>
      <div className="flex max-w-60">
        {SKILL_RATINGS.map((star) => (
          <label key={star} className="relative flex-1 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={() => setRating(star)}
              required
              className="peer sr-only"
            />
            <span className="grid min-h-11 place-items-center rounded-md hover:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
              <Star
                aria-hidden="true"
                className={cn("size-5", rating !== undefined && star <= rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground")}
              />
            </span>
            <span className="sr-only">{star} {star === 1 ? "star" : "stars"}</span>
          </label>
        ))}
      </div>
      <p aria-hidden="true" className="text-sm text-muted-foreground">
        {rating === undefined ? "Choose a rating" : `${rating} out of 5 stars`}
      </p>
    </fieldset>
  );
}
