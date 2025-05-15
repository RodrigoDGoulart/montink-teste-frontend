interface Props {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export default function ColorSelector(props: Props) {
  return (
    <button className="rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer" style={{ backgroundColor: props.color }} onClick={props.onClick}>
      {props.selected && <div className="rounded-full w-[24px] h-[24px] border-2 border-white " />}
    </button>
  )
} 