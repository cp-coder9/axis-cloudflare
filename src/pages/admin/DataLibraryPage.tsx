import { File, Image as ImageIcon, Archive, Folder, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { FileObject } from "@shared/types";

const FileIcon = ({ type }: { type: FileObject['type'] }) => {
  switch (type) {
    case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    case 'archive': return <Archive className="h-5 w-5 text-muted-foreground" />;
    default: return <File className="h-5 w-5 text-muted-foreground" />;
  }
};

const FileList = ({ files }: { files: FileObject[] }) => (
  <div className="space-y-4">
    {files.length === 0 ? (
      <p className="text-sm text-muted-foreground text-center py-4">No files found.</p>
    ) : (
      files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-4">
            <FileIcon type={file.type} />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(file.modifiedAt).toLocaleDateString()}
          </p>
        </div>
      ))
    )}
  </div>
);

export default function AdminDataLibraryPage() {
  const { data: files, isLoading, error } = useQuery<FileObject[]>({
    queryKey: ['files'],
    queryFn: () => fetch('/api/files').then(res => res.json()),
  });

  const documents = files?.filter(f => f.type === 'document') || [];
  const images = files?.filter(f => f.type === 'image') || [];
  const archives = files?.filter(f => f.type === 'archive') || [];

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    if (error) {
      return <div className="text-center text-destructive py-12">Error loading files: {error.message}</div>;
    }
    return (
      <>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <FileList files={documents} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <FileList files={images} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archives">
          <Card>
            <CardHeader>
              <CardTitle>Archives</CardTitle>
            </CardHeader>
            <CardContent>
              <FileList files={archives} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="folders">
            <Card>
                <CardHeader>
                    <CardTitle>Folders</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                    <Folder className="h-12 w-12 mx-auto mb-4" />
                    <p>Folder management is coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Library</h2>
          <p className="text-muted-foreground">
            Manage all your firm's documents and assets.
          </p>
        </div>
      </div>
      <Tabs defaultValue="documents">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>
        {renderContent()}
      </Tabs>
    </div>
  );
}