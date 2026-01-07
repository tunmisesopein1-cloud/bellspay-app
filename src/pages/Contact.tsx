import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received",
      description: "Thanks! We'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Bells Bank</title>
        <meta
          name="description"
          content="Contact Bells Bank support. Send a message and we’ll respond as soon as possible."
        />
        <link rel="canonical" href={`${window.location.origin}/contact`} />
      </Helmet>

      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <Header />

        <main className="container py-6 space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl">
              Need help with your account? Send a message and our team will respond.
            </p>
          </header>

          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className="min-h-32"
                    required
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Contact;
