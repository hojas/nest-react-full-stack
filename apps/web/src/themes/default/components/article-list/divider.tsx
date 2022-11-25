export const Divider = ({ index, length }: { index: number; length: number }) =>
  index !== length - 1 ? <div className="divider" /> : null
