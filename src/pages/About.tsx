import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import bellsUniversity from "@/assets/bells-university.webp";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Bells Bank</title>
        <meta
          name="description"
          content="Learn more about Bells Bank and our mission to make student banking simple, secure, and fast."
        />
        <link rel="canonical" href={`${window.location.origin}/about`} />
      </Helmet>

      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <Header />

        <main className="container py-6 space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">About Bells Bank</h1>
            <p className="text-muted-foreground max-w-2xl">
              Built for campus life—quick transfers, clear history, and cards you can control.
            </p>
          </header>

          <Card className="border-border/50 overflow-hidden">
            <div className="relative h-40 w-full">
              <img
                src={bellsUniversity}
                alt="Bells University campus"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
            </div>
            <CardContent className="py-6 space-y-4">
              <p className="text-foreground leading-relaxed">
                Bells Bank is a student-first digital banking experience designed to help you manage
                money with less stress: view your balance, move funds, and track your activity.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-base">Simple</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Clean interface focused on the essentials.
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-base">Secure</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Built with modern authentication and protected data access.
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-base">Fast</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Quick navigation and responsive pages.
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default About;
