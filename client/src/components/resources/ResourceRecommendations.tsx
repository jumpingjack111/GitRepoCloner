import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Globe, Award, ExternalLink } from "lucide-react";

// Define types for resources
interface Resource {
  id: string;
  title: string;
  type: 'book' | 'article' | 'video' | 'website' | 'course';
  url: string;
  description: string;
  tags: string[];
}

// Resources organized by phase
interface PhaseResources {
  phase1: Resource[];
  phase2: Resource[];
  phase3: Resource[];
  phase4: Resource[];
}

// Sample academic resources for ISI MSQE preparation
const resourceData: PhaseResources = {
  phase1: [
    {
      id: "p1-r1",
      title: "Mathematics for Economists by Carl P. Simon and Lawrence Blume",
      type: "book",
      url: "https://www.amazon.com/Mathematics-Economists-Carl-P-Simon/dp/0393957330",
      description: "Comprehensive coverage of mathematical tools used in economics, providing a solid foundation for advanced economics studies.",
      tags: ["mathematics", "foundation", "calculus", "algebra"]
    },
    {
      id: "p1-r2",
      title: "Khan Academy - Linear Algebra",
      type: "course",
      url: "https://www.khanacademy.org/math/linear-algebra",
      description: "Free online course covering all the essential topics in linear algebra with practice problems.",
      tags: ["linear algebra", "matrices", "vectors", "free"]
    },
    {
      id: "p1-r3",
      title: "Principles of Microeconomics by N. Gregory Mankiw",
      type: "book",
      url: "https://www.amazon.com/Principles-Microeconomics-N-Gregory-Mankiw/dp/0538453044",
      description: "Clear introduction to microeconomic concepts with real-world applications and examples.",
      tags: ["microeconomics", "basics", "foundation"]
    },
    {
      id: "p1-r4",
      title: "MIT OpenCourseWare - Introduction to Statistical Methods in Economics",
      type: "course",
      url: "https://ocw.mit.edu/courses/economics/14-30-introduction-to-statistical-methods-in-economics-spring-2009/",
      description: "Free online course materials from MIT on statistical methods specific to economics applications.",
      tags: ["statistics", "econometrics", "foundation"]
    }
  ],
  phase2: [
    {
      id: "p2-r1",
      title: "Microeconomic Theory by Andreu Mas-Colell, Michael Whinston, and Jerry Green",
      type: "book",
      url: "https://www.amazon.com/Microeconomic-Theory-Andreu-Mas-Colell/dp/0195073401",
      description: "Advanced textbook covering microeconomic theory in depth, often used in graduate-level economics courses.",
      tags: ["microeconomics", "advanced", "theory"]
    },
    {
      id: "p2-r2",
      title: "Macroeconomics by Olivier Blanchard",
      type: "book",
      url: "https://www.amazon.com/Macroeconomics-7th-Olivier-Blanchard/dp/0133780589",
      description: "Comprehensive guide to macroeconomics with focus on both theory and policy applications.",
      tags: ["macroeconomics", "policy", "intermediate"]
    },
    {
      id: "p2-r3",
      title: "Introduction to Econometrics by James H. Stock and Mark W. Watson",
      type: "book",
      url: "https://www.amazon.com/Introduction-Econometrics-3rd-James-Stock/dp/0138009007",
      description: "Accessible introduction to econometrics with practical examples and applications.",
      tags: ["econometrics", "statistics", "regression"]
    },
    {
      id: "p2-r4",
      title: "Yale University - Financial Markets with Robert Shiller",
      type: "course",
      url: "https://www.coursera.org/learn/financial-markets-global",
      description: "Free course taught by Nobel Prize winner Robert Shiller, covering financial markets and their economic impact.",
      tags: ["finance", "markets", "economics"]
    }
  ],
  phase3: [
    {
      id: "p3-r1",
      title: "Game Theory: An Introduction by Steven Tadelis",
      type: "book",
      url: "https://www.amazon.com/Game-Theory-Introduction-Steven-Tadelis/dp/0691129088",
      description: "Clear and rigorous introduction to game theory with applications in economics and other fields.",
      tags: ["game theory", "strategic thinking", "advanced"]
    },
    {
      id: "p3-r2",
      title: "Econometric Analysis by William H. Greene",
      type: "book",
      url: "https://www.amazon.com/Econometric-Analysis-7th-William-Greene/dp/0131395386",
      description: "Comprehensive graduate-level textbook covering advanced econometric techniques and methods.",
      tags: ["econometrics", "advanced", "quantitative"]
    },
    {
      id: "p3-r3",
      title: "Advanced Macroeconomics by David Romer",
      type: "book",
      url: "https://www.amazon.com/Advanced-Macroeconomics-Mcgraw-hill-Economics-David/dp/0073511374",
      description: "Graduate-level textbook covering modern macroeconomic theory, models, and empirical approaches.",
      tags: ["macroeconomics", "advanced", "models"]
    },
    {
      id: "p3-r4",
      title: "NBER Working Papers",
      type: "website",
      url: "https://www.nber.org/papers",
      description: "Collection of cutting-edge research papers in economics from the National Bureau of Economic Research.",
      tags: ["research", "papers", "current topics"]
    }
  ],
  phase4: [
    {
      id: "p4-r1",
      title: "Previous Years' ISI MSQE Entrance Exam Papers",
      type: "article",
      url: "https://www.isical.ac.in/~admission/",
      description: "Collection of previous years' entrance exam papers for the ISI MSQE program, useful for practice and understanding the exam pattern.",
      tags: ["practice", "exam preparation", "problem-solving"]
    },
    {
      id: "p4-r2",
      title: "ISI MSQE Sample Questions and Solved Problems",
      type: "article",
      url: "https://www.isical.ac.in/~admission/Papers/Sample%20Questions/",
      description: "Sample questions and solved problems specifically designed for ISI MSQE entrance preparation.",
      tags: ["practice", "solutions", "preparation"]
    },
    {
      id: "p4-r3",
      title: "Mathematical Statistics with Applications by Dennis Wackerly, William Mendenhall, and Richard L. Scheaffer",
      type: "book",
      url: "https://www.amazon.com/Mathematical-Statistics-Applications-Dennis-Wackerly/dp/0495110817",
      description: "Comprehensive textbook covering statistical theory and methods with applications.",
      tags: ["statistics", "probability", "advanced"]
    },
    {
      id: "p4-r4",
      title: "ISI MSQE Syllabus and Selection Process",
      type: "website",
      url: "https://www.isical.ac.in/~admission/",
      description: "Official information about the syllabus, selection process, and requirements for the ISI MSQE program.",
      tags: ["syllabus", "official", "requirements"]
    }
  ]
};

// Function to render the icon based on resource type
const getResourceIcon = (type: string) => {
  switch (type) {
    case 'book':
      return <BookOpen className="h-5 w-5" />;
    case 'article':
      return <FileText className="h-5 w-5" />;
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'website':
      return <Globe className="h-5 w-5" />;
    case 'course':
      return <Award className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
};

export default function ResourceRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Resources</CardTitle>
        <CardDescription>
          Recommended learning materials for ISI MSQE preparation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phase1">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="phase1">Foundation</TabsTrigger>
            <TabsTrigger value="phase2">Core Prep</TabsTrigger>
            <TabsTrigger value="phase3">Advanced</TabsTrigger>
            <TabsTrigger value="phase4">Final Prep</TabsTrigger>
          </TabsList>
          
          {Object.keys(resourceData).map((phase) => (
            <TabsContent value={phase} key={phase} className="space-y-4">
              {resourceData[phase as keyof PhaseResources].map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Component for rendering individual resource cards
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md text-primary">
            {getResourceIcon(resource.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <Badge className="capitalize">
                {resource.type}
              </Badge>
            </div>
            
            <p className="mt-2 text-muted-foreground">
              {resource.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => window.open(resource.url, '_blank')}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                View Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}