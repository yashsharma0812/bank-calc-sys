import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "@/components/Calculator";
import BankAccount from "@/components/BankAccount";
import { Calculator as CalcIcon, Wallet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Financial Tools Suite
          </h1>
          <p className="text-muted-foreground">
            Manage your calculations and banking operations in one place
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <CalcIcon className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Banking
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="mt-0">
            <Calculator />
          </TabsContent>
          
          <TabsContent value="banking" className="mt-0">
            <BankAccount />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
