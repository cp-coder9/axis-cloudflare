import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_FILES } from "@shared/mock-data";
import { FileObject } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Download, File, Image as ImageIcon, Archive } from "lucide-react";
const FileIcon = ({ type }: { type: FileObject['type'] }) => {
  switch (type) {
    case 'image': return <ImageIcon className="h-4 w-4 text-muted-foreground" />;
    case 'archive': return <Archive className="h-4 w-4 text-muted-foreground" />;
    default: return <File className="h-4 w-4 text-muted-foreground" />;
  }
};
const FilesTable = ({ files }: { files: FileObject[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>Last Modified</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {files.map(file => (
        <TableRow key={file.id}>
          <TableCell className="font-medium flex items-center gap-2">
            <FileIcon type={file.type} />
            {file.name}
          </TableCell>
          <TableCell>{(file.size / 1024 / 1024).toFixed(2)} MB</TableCell>
          <TableCell>{new Date(file.modifiedAt).toLocaleDateString()}</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
export default function ClientFilesPage() {
  const documents = MOCK_FILES.filter(f => f.type === 'document');
  const images = MOCK_FILES.filter(f => f.type === 'image');
  const archives = MOCK_FILES.filter(f => f.type === 'archive');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Files & Documents</h2>
        <p className="text-muted-foreground">Access all shared documents for your projects.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Documents</CardTitle>
          <CardDescription>All files related to the 'Downtown Tower' project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="archives">Archives</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <FilesTable files={MOCK_FILES} />
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
              <FilesTable files={documents} />
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <FilesTable files={images} />
            </TabsContent>
            <TabsContent value="archives" className="mt-4">
              <FilesTable files={archives} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}