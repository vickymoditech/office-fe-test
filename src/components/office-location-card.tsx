"use client";

import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Location } from "@/utils/types";

type Props = {
  location: Location;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const OfficeLocationCard = ({
  location: { title, address, employee },
  onEdit,
  onRemove,
}: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full rounded-lg mb-4">
      <AccordionItem value={title} className="rounded-lg shadow-2xl ">
        <AccordionTrigger
          className={` bg-slate-400 hover:no-underline rounded-lg p-6 text-white flex justify-between items-center`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white text-[22px] ">{title}</h3>
            <p className="text-muted-foreground text-base text-white">
              {address}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pb-0 rounded-lg">
          {employee && (
            <div className="space-y-2">
              <h4 className="font-semibold text-base">{employee.name}</h4>
              <p className="text-sm text-muted-foreground">
                {employee.position}
              </p>
              <Link
                href={`mailto:${employee.email}`}
                className="text-sm text-[#41B9D1]"
              >
                {employee.email}
              </Link>
              <p className="text-sm ">{employee.phone}</p>
              <div className="flex gap-2 mt-4 border-t align-center justify-between py-2">
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
