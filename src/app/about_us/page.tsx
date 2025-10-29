export default function AboutUs() {
    return (
        <main>
            <div className="w-full h-[100vh] bg-[url('/bg.jpg')] bg-cover bg-center shadow-xl flex flex-col content-center  align-center justify-center items-center gap-20">
                <h1 className="text-5xl lg:text-7xl font-bold text-white text-center drop-shadow-lg flex center-center">
                    O nas
                </h1>
                
                <span className="lg:text-xl w-[50%] mt-6 block text-center px-4 lg:px-0 drop-shadow-lg text-white">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>

                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full drop-shadow-lg">
                    Czytaj więcej...
                </button>
            </div>

            <div className="w-full h-[100vh] py-20 px-6 lg:px-0 flex  content-center align-center justify-center items-center gap-10">
                <div className="w-[50%] h-full flex flex-col content-center align-center justify-center items-center gap-10">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 text-center">
                        Nasza misja i wartości
                    </h2>
                    <span className="lg:text-lg text-left text-gray-600 w-[70%]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                    </span>
                    <div className="flex center-center gap-4">
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full drop-shadow-lg">Zadźwoń</button>
                        <button className="border-cyan-600 border-2 text-cyan-600 font-bold py-3 px-6 rounded-full drop-shadow-lg">Sprawdź</button>
                    </div>
                </div>
                <div className="w-[30%] h-full flex center-center">
                    <img src="./person.webp" className="h-[80vh] rounded-2xl" alt="" />
                </div>
            </div>
        </main>
    )
}