import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export default function SelectDateBirth({
	register,
	label,
	control,
	watch,
}: {
	watch: (field: string) => void;
	register: any;
	label: any;
	control: any;
}) {
	const [date, setDate] = useState<Date>();
	const dateReceived = watch("dataNastere");
	return (
		
	);
}
