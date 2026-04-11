"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export function BioAutoGenModal({ onGenerate }: { onGenerate: (bio: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");

  const handleGenerate = async () => {
    if (!skills.trim() || !experience.trim()) {
      toast.error("Skills and experience are required");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post<{ bio: string }>("/ai/generate-bio", {
        skills: skills.split(",").map(s => s.trim()),
        experienceYears: parseInt(experience, 10),
        teachingStyle
      });

      if (response.success && response.data?.bio) {
        onGenerate(response.data.bio);
        setIsOpen(false);
        toast.success("Bio generated successfully!");
      } else {
        toast.error("Failed to generate bio");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Wand2 className="h-4 w-4" />
          Auto Generate AI Bio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Professional Bio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Top Skills (comma-separated) *</Label>
            <Input 
              placeholder="e.g. React, Node.js, Typescript" 
              value={skills} 
              onChange={e => setSkills(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Years of Experience *</Label>
            <Input 
              type="number" 
              placeholder="e.g. 5" 
              value={experience} 
              onChange={e => setExperience(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Teaching Style (Optional)</Label>
            <Textarea 
              placeholder="e.g. Patient, hands-on, project-based" 
              value={teachingStyle} 
              onChange={e => setTeachingStyle(e.target.value)} 
            />
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
            Generate Bio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
