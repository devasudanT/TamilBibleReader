import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, Book, BarChart4, Calendar } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          About App
        </h2>
        
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Description</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Tamil KJV Bible is a Bible reading application that provides the King James Version translation in Tamil language. 
                  The app is designed to offer a clean and intuitive reading experience with easy navigation 
                  between books, chapters, and verses.
                </p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Version Information</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Version:</span> 1.0.0
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Last Updated:</span> April 24, 2025
                </p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <BarChart4 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Features</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Complete Tamil KJV Bible with 66 books, 1,189 chapters and 31,102 verses</li>
                  <li>Easy navigation through books, chapters, and verses</li>
                  <li>Search functionality to find specific verses or passages</li>
                  <li>Copy verses to clipboard</li>
                  <li>Adjustable font size for comfortable reading</li>
                  <li>Dark and light theme options</li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <Book className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">About Translation</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  This application uses the Tamil King James Version (KJV) translation of the Bible, 
                  which is a faithful translation of the Holy Scriptures in Tamil language based on the 
                  authorized King James Version in English.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <FooterNav />
    </div>
  );
};

export default About;