import { useState } from "react";
import { Button } from "./ui/button";
import { Loader, Plus, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Image as Icon, X } from "lucide-react";
import { sanity } from "@/db/sanity";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { createPost, fetchUserId } from "@/lib/requests";
import { useToast } from "./ui/use-toast";

export default function PostButton() {
  const [content, setContent] = useState("");
  const [withImage, setWithImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      sanity.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImageAsset(document?.url);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const onPost = async () => {
    const id = await fetchUserId();
    if (id) {
      await createPost({
        content: content,
        image: imageAsset ? imageAsset : "",
        userId: id,
      }).then((res) => console.log(res));
      setContent("");
      setImageAsset(null);
      setWithImage(false);
      toast({
        title: "Post Uploaded",
      });
    } else {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-white w-full bg-[#3576df] flex justify-center md:justify-center items-center gap-2 py-2 rounded-[.5em]">
          <Plus />
          <span className="hidden md:inline">Post</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What&#39;s on your mind?</DialogTitle>
        </DialogHeader>
        <Textarea
          className="h-[150px] resize-none"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <DialogDescription
          className={cn(
            "flex justify-between items-center",
            content.length > 300 ? "text-red-500" : ""
          )}
        >
          {withImage ? (
            <X
              className="cursor-pointer"
              onClick={() => setWithImage(!withImage)}
            />
          ) : (
            <Icon
              className="cursor-pointer"
              onClick={() => setWithImage(!withImage)}
            />
          )}
          <span>{content.length}/300</span>
        </DialogDescription>
        {withImage && (
          <div className="w-full h-[200px] border-[2px] border-[#0F2B77] rounded-lg">
            {!imageAsset && !loading ? (
              <label className="relative w-full h-full grid place-items-center">
                <input
                  type="file"
                  onChange={uploadImage}
                  className="w-0 h-0 absolute opacity-0"
                />
                <Upload size="15px" />
              </label>
            ) : loading ? (
              <div className="w-full h-full grid place-items-center">
                <Loader className="animate-spin" size="15px" />
              </div>
            ) : (
              imageAsset && (
                <div className="w-full h-full relative grid place-items-center">
                  <Image
                    src={imageAsset}
                    alt="uploaded image"
                    className="h-[180px] object-contain"
                    width={500}
                    height={500}
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => setImageAsset(null)}
                  >
                    <X />
                  </Button>
                </div>
              )
            )}
          </div>
        )}
        <DialogFooter className="flex justify-end">
          <Button onClick={() => onPost()}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
