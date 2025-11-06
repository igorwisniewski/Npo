import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface ContactInfoItemProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    link?: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ Icon, text, link }) => (
    <div className="flex items-center space-x-4 mb-6">
        <div className="flex-shrink-0 p-3 bg-red-900 rounded-full text-white shadow-lg">
            <Icon className="w-6 h-6" />
        </div>
        {link ? (
            <a href={link} className="text-white hover:text-red-200 font-medium transition duration-300">
                {text}
            </a>
        ) : (
            <p className="text-white font-medium">
                {text}
            </p>
        )}
    </div>
);

export default function Contact() {
    const contactDetails = [
        { Icon: Phone, text: "+48 793 055 911", link: "tel:+48793055911" },
        { Icon: Mail, text: "kontakt@cncg.pl", link: "mailto:kontakt@cncg.pl" },
        { Icon: MapPin, text: "ul. Witosa 3A lok. 9 18-500, Kolno", link: "https://www.google.com/maps?ll=53.410811,21.923202&z=13&t=m&hl=pl-PL&gl=US&mapclient=embed&q=ul.+Wincentego+Witosa+3A+lok.+9+18-500,+Kolno" }, 
    ];

    const openingHours = [
        { day: "Poniedziałek - Piątek", hours: "9:00 - 17:00" },
        { day: "Sobota", hours: "10:00 - 14:00" },
        { day: "Niedziela", hours: "Zamknięte" },
    ];

    return (
        <div className="flex flex-col sm:flex-col-reverse lg:flex-row w-full max-w-6xl gap-8 mx-auto my-12 p-6 bg-white">
            <div className="lg:w-1/3 p-6 lg:p-10 bg-red-800 rounded-xl shadow-xl ">
                <h2 className="text-3xl font-bold text-gray-50 mb-8 border-b pb-2">Skontaktuj się z nami</h2>
                
                {contactDetails.map((item, index) => (
                    <ContactInfoItem key={`contact-${index}`} {...item} />
                ))}

                <div className="mt-10">
                    <h3 className="flex items-center text-xl font-bold text-gray-50 mb-4 border-b pb-2">
                        <Clock className="w-5 h-5 mr-2" />
                        Godziny Otwarcia
                    </h3>
                    <div className="space-y-2">
                        {openingHours.map((item, index) => (
                            <div key={`hours-${index}`} className="flex justify-between text-white">
                                <span className="font-medium">{item.day}</span>
                                <span>{item.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="lg:w-2/3 p-6 lg:p-10 shadow-xl rounded-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Wyślij wiadomość</h2>
                <form action="https://formspree.io/f/xblzqwdy" method="POST" className="space-y-5">
                    
                    <label className="block">
                        <span className="text-gray-700 font-medium block mb-1">E-mail:</span>
                        <input 
                            type="email" 
                            name="email" 
                            required
                            placeholder="Twój adres e-mail"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border" 
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700 font-medium block mb-1">Imię:</span>
                        <input 
                            type="text" 
                            name="name" 
                            required
                            placeholder="Twoje imię"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border"
                        />
                    </label>
                    
                    <label className="block">
                        <span className="text-gray-700 font-medium block mb-1">Wiadomość:</span>
                        <textarea 
                            name="message" 
                            rows={6} 
                            required
                            placeholder="Treść Twojej wiadomości..."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border"
                        ></textarea>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer pt-2">
                        <input 
                            type='checkbox' 
                            name="property" 
                            className="h-5 w-5 rounded border-red-800
               accent-red-800 focus:ring-red-800"
                        />
                        <span className="text-gray-700 font-medium">Posiadam nieruchomość</span>
                    </label>

                    <button 
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-700 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300 ease-in-out mt-6"
                    >
                        Wyślij
                    </button>
                </form>
            </div>
        </div>
    )
}