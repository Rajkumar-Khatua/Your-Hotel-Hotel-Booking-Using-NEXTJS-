"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { CiCircleRemove } from "react-icons/ci";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showRest?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Does'nt match any result ",
  subtitle = "Please try another search term or remove some filters.",
  showRest,
}) => {
  const router = useRouter();

  return (
    <div
      className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center"
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showRest && (
          <Button
            outline
            onClick={() => router.push("/")}
            label="Let's Start over"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
