import dayjs from "dayjs"

import { Avatar } from "@/components/avatar"
import { Popover, PopoverTrigger } from "@/components/popover"
import { PopoverContent } from "@radix-ui/react-popover"
import { DateTimeFormatEnum } from "@/enums/date-time-format.enum"

export type TFormattedEndorsement = {
    endorser: { name: string; profilePicture: string }
    date: string
    message: string
}

type EndorsementsGroupProps = {
    endorsements: TFormattedEndorsement[]
}

export const EndorsementsGroup = ({ endorsements }: EndorsementsGroupProps) => {
    const firstThreeEndorsements = endorsements.slice(0, 3)

    return (
        <div>
            <Popover modal>
                <PopoverTrigger>
                    <div>
                        {firstThreeEndorsements.map((endorsement) => (
                            <Avatar
                                size="sm"
                                src={endorsement.endorser.profilePicture}
                                alt={endorsement.endorser.name}
                                fallback={endorsement.endorser.name.slice(0, 1)}
                            />
                        ))}
                    </div>
                </PopoverTrigger>

                <PopoverContent className="max-h-[500px] w-96 overflow-auto rounded-lg border bg-white shadow">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 p-4 text-base">
                        <h4 className="font-semibold text-gray-800">Endorsements</h4>
                        <span>{endorsements.length}</span>
                    </div>

                    {endorsements.map((endorsement) => (
                        <div className="border-b border-gray-100 p-4 last:border-none">
                            <div className="flex gap-2">
                                <Avatar
                                    src={endorsement.endorser.profilePicture}
                                    alt={endorsement.endorser.name}
                                    fallback={endorsement.endorser.name.slice(0, 1)}
                                />

                                <div>
                                    <div className="pb-3">
                                        <h5 className="pb-1 text-base font-medium text-gray-800">
                                            {endorsement.endorser.name}
                                        </h5>
                                        <p className="text-xs font-medium text-gray-500">
                                            {dayjs(endorsement.date).millisecond(0).format(DateTimeFormatEnum.ddmmYYYY)}
                                        </p>
                                    </div>

                                    <p className="text-gray-700">{endorsement.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </PopoverContent>
            </Popover>
        </div>
    )
}
