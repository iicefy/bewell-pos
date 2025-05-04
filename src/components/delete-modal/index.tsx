import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName: string;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  productName,
}: DeleteModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ลบจากตะกร้าสินค้า</AlertDialogTitle>
          <AlertDialogDescription>
            ต้องการลบ {productName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>ยกเลิก</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            ลบ
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
