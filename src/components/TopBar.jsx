import PhoneIcon from "@mui/icons-material/Phone";

export default function TopBar() {
  return (
    <div className="relative w-full bg-green-200 px-3 py-1 flex justify-between items-center z-1200">
      <h3>24 hours</h3>
      <div className="flex gap-1 items-center">
        <PhoneIcon fontSize="small" />
        <p>1-672-4772</p>
      </div>
    </div>
  );
}
