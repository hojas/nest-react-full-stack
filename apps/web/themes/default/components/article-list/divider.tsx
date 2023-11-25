export const Divider = ({
  index,
  length,
}: {
  index: number
  length: number
}) =>
  index !== length - 1 ? (
    <div className="border-[0] border-b-[1px] border-neutral-200 border-solid" />
  ) : null
