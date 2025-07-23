import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/koollbreezze",
    icon: Instagram,
    className: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/koollbreezze",
    icon: Twitter,
    className: "bg-blue-500"
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@beatrepreneur",
    icon: Youtube,
    className: "bg-red-600"
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/koollbreezze",
    icon: Music,
    className: "bg-orange-500"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6 text-gradient">
            ABOUT
          </h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Biography Content */}
            <div className="order-2 lg:order-1">
              <h3 className="font-orbitron font-bold text-3xl mb-8 text-yellow-400">
                Koollbreezze da Beatrepreneur
              </h3>
              
              <div className="prose prose-lg text-gray-400 leading-relaxed space-y-6">
                <p>
                  Koollbreezze da Beatrepreneur is a visionary music producer and artist known for creating unique soundscapes that blend multiple genres into a distinctive style. Koollbreezze started in Hip Hop as a breakdancer, the youngest in a breakdancing group, The Street Rockers, who later became the Rock Rockers.
                </p>
                
                <p>
                  Many of his fellow break dancers went on to form the rap group The Legion of Doom. Koollbreezze was not rapping then but moved to Lubbock, Texas in his early twenties and began to rap in a group called West Texas Mob, where he would acquire a love for rapping on stage and garnering a fan base.
                </p>
                
                <p>
                  He moved back to San Diego, California after the group broke up and later began to rap in the group, Deuces Wild with a fellow rapper Slim Luciano where Slim would make the beats and rap along with Koollbreezze. At the time he was going by the rap name da Rellative.
                </p>
                
                <p>
                  Then he formed Nightbreed Entertainment Inc. to secure a record company, with the thoughts of controlling his own rap career, along with Slim Luciano. His studio was robbed and vital recordings were taken he couldn't trust anyone so he decided to start working with Knitwit da Krow and joined the Krow family.
                </p>
                
                <p>
                  After creative differences he went on his rapping journey as a solo artist, and began to produce his own music and moved back to Lubbock, Texas where he is currently living, and currently making hit music.
                </p>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-12">
                <h4 className="font-semibold text-xl mb-6 text-orange-500">Connect</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={social.name}
                        asChild
                        className={`${social.className} text-white px-6 py-3 rounded-full font-semibold hover-glow flex items-center space-x-2`}
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="h-5 w-5" />
                          <span>{social.name}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Profile Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/543f2035e88e546d138f50421122abe9.jpg"
                  alt="Koollbreezze da Beatrepreneur"
                  className="w-full rounded-2xl shadow-2xl hover-glow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
