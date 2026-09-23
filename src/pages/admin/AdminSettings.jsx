import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Site settings (placeholder).</p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site name</Label>
            <Input className="p-3" id="site-name" defaultValue="Neumorph" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input className="p-3" id="tagline" defaultValue="Soft, tactile interfaces — the neumorphic way" />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}