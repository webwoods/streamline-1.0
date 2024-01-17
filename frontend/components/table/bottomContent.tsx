import page from "@/app/page";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/react";

interface Props {
  selectedKeys: any
  filteredItems: any
  page: number
  pages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  onPreviousPage: () => void
  onNextPage: () => void
}

export default function BottomContent({
  selectedKeys,
  filteredItems,
  page,
  pages,
  setPage,
  onPreviousPage,
  onNextPage
}: Props) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        initialPage={page}
        page={page}
        onChange={setPage}
        total={pages}
        loop
        radius="full"
        classNames={{
          cursor: "bg-slate-800"
        }}
      />
      {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage} className="bg-slate-200 hover:bg-slate-300 rounded-sm">
          Previous
        </Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage} className="bg-slate-200 hover:bg-slate-300 rounded-sm">
          Next
        </Button>
      </div> */}
    </div>
  );
}