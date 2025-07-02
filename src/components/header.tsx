import { FizziLogo } from "./logo"

type Props = {}

export default function Header({ }: Props) {
    return (
        <div className="flex justify-center py-4 -mb-28">
            <FizziLogo className="h-20 z-10 cursor-pointer text-sky-800" />
        </div>
    )
}