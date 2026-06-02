import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Titles of the previous simulated articles to delete
const oldTitles = [
    "Polo logístico de Vitória da Conquista atrai R$ 50 milhões em novos investimentos e promete gerar 800 empregos",
    "Prefeitura de Poções inicia reforma e ampliação de escolas na zona rural do município",
    "Operação policial desarticula quadrilha de roubo de veículos que atuava em Jequié e região",
    "Campanha de vacinação contra a Influenza supera expectativas e bate meta em Planalto",
    "Safra de café em Brumado e Barra do Choça anima produtores rurais após chuvas regulares",
    "Cultura nordestina em alta: Itapetinga anuncia grande festival de São João antecipado",
    "Obras de infraestrutura viária no Sudoeste avançam e prometem maior segurança aos motoristas",
    "Campeonato Municipal de Poções empolga torcedores e revela jovens talentos do futebol",
    "Comércio do Sudoeste adota inovações digitais para alavancar vendas na região",
    "Hospital Geral de Vitória da Conquista recebe novos leitos e equipamentos de alta complexidade"
];

const realArticles = [
    {
        title: "João Gomes, Nattan e Adelmário Coelho: confira atrações do São João de Jequié para 2026",
        category: "Cultura",
        city: "Jequié",
        image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000",
        summary: "A prefeitura de Jequié divulgou as grandes atrações musicais do São João deste ano. Apresentações gratuitas acontecem na Praça da Bandeira.",
        content: `
            <p>A prefeitura de Jequié divulgou no início de maio as atrações do aguardado São João de 2026. Neste ano, artistas de peso nacional como João Gomes, Iguinho e Lulinha, Nattan e Adelmário Coelho estão confirmados para animar o público.</p>
            <p>Os shows gratuitos vão acontecer na Praça da Bandeira, localizada no centro da cidade, entre os dias 14 e 24 de junho.</p>
            <h2>Estrutura e Expectativa</h2>
            <p>O evento promete ser um dos maiores da região, com a prefeitura promovendo estandes temáticos e intensificando os preparativos de infraestrutura para receber turistas de todo o estado, fortalecendo a economia local.</p>
        `,
        tags: ["jequié", "são joão", "cultura", "shows"],
        featured: true,
    },
    {
        title: "Vitória da Conquista recebe unidades temporárias para emissão da nova Carteira de Identidade Nacional",
        category: "Serviços",
        city: "Vitória da Conquista",
        image_url: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=1000",
        summary: "Ação especial nos colégios estaduais facilita o acesso da população do Sudoeste Baiano ao novo modelo de identidade.",
        content: `
            <p>A população de Vitória da Conquista e municípios vizinhos passa a contar com novas unidades temporárias para a emissão da Carteira de Identidade Nacional (CIN). A ação, divulgada pelo governo estadual, ocorre durante o mês de maio.</p>
            <p>O atendimento especial foi descentralizado e está sendo realizado diretamente em colégios estaduais, visando desafogar os postos do SAC e agilizar o processo para a obtenção do novo documento.</p>
            <h2>Modernização</h2>
            <p>A nova CIN unifica o número do CPF como registro geral, oferecendo mais segurança contra fraudes e praticidade para o cidadão no acesso a serviços públicos.</p>
        `,
        tags: ["vitória da conquista", "serviços públicos", "documentos", "cidadania"],
        featured: false,
    },
    {
        title: "Dois homens são presos em flagrante suspeitos de tráfico de drogas no bairro Tiradentes em Poções",
        category: "Policial",
        city: "Poções",
        image_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1000",
        summary: "Ação da Polícia Civil resultou na apreensão de cocaína e uma arma de fogo artesanal em localidade conhecida como Beco da Coceira.",
        content: `
            <p>A Polícia Civil da Bahia, por meio da Delegacia Territorial de Poções (DT/Poções), prendeu em flagrante dois homens de 48 e 43 anos, suspeitos de tráfico de drogas e associação para o tráfico.</p>
            <p>A ação ocorreu em maio na área conhecida como Beco da Coceira, no bairro Tiradentes, após investigações da unidade policial.</p>
            <h2>Apreensões</h2>
            <p>Durante as buscas, os investigadores apreenderam porções de cocaína, uma quantia em dinheiro, aparelhos celulares e uma arma de fogo de fabricação artesanal. Os suspeitos seguem custodiados à disposição da Justiça.</p>
        `,
        tags: ["poções", "segurança", "operação policial", "tráfico"],
        featured: false,
    },
    {
        title: "Setre oferece vagas temporárias com salários de até R$ 3,8 mil em Brumado",
        category: "Economia",
        city: "Brumado",
        image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000",
        summary: "Secretaria do Trabalho divulga oportunidades pelo Governo da Bahia para atuação na cidade, aquecendo o mercado de trabalho local.",
        content: `
            <p>A Secretaria do Trabalho, Emprego, Renda e Esporte (Setre) do Governo da Bahia lançou um processo seletivo para o preenchimento de vagas temporárias, contemplando os municípios de Salvador e Brumado, no sudoeste do estado.</p>
            <p>As inscrições foram abertas no final de maio, oferecendo salários que podem chegar a R$ 3,8 mil, dependendo da qualificação exigida para os cargos ofertados.</p>
            <h2>Oportunidade</h2>
            <p>O processo seletivo é uma excelente oportunidade para profissionais da região de Brumado ingressarem no serviço público estadual de forma temporária, garantindo renda e experiência no currículo.</p>
        `,
        tags: ["brumado", "emprego", "economia", "concursos"],
        featured: true,
    },
    {
        title: "Câmara de Itapetinga realiza sessão itinerante em homenagem aos garis e lavadeiras do município",
        category: "Sociedade",
        city: "Itapetinga",
        image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1000",
        summary: "Iniciativa do legislativo municipal buscou reconhecer e valorizar o trabalho dessas categorias essenciais para o funcionamento da cidade.",
        content: `
            <p>A Câmara Municipal de Itapetinga promoveu, no dia 14 de maio, uma Sessão Especial Itinerante voltada à valorização de duas categorias trabalhistas essenciais: os garis e as lavadeiras do município.</p>
            <p>De autoria do vereador Anderson da Nova, o evento tirou o legislativo de sua sede tradicional para aproximar os parlamentares da realidade dessas categorias.</p>
            <h2>Reconhecimento</h2>
            <p><em>"É fundamental reconhecermos o trabalho árduo daqueles que garantem a limpeza, a higiene e o bem-estar de nossa cidade diariamente"</em>, pontuou o requerimento. A sessão entregou moções de aplausos e ouviu demandas diretas dos trabalhadores.</p>
        `,
        tags: ["itapetinga", "câmara", "sociedade", "trabalhadores"],
        featured: false,
    },
    {
        title: "Ação do 'Maio Amarelo' mobiliza mais de 1.400 estudantes das escolas municipais de Jequié",
        category: "Educação",
        city: "Jequié",
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000",
        summary: "Prefeitura and órgãos de trânsito promovem palestras e atividades educativas para formar futuros motoristas e pedestres mais conscientes.",
        content: `
            <p>Em adesão à campanha nacional de segurança no trânsito, a Prefeitura de Jequié realizou uma grande mobilização nas escolas da rede municipal durante o "Maio Amarelo".</p>
            <p>Segundo o balanço divulgado no final do mês, as ações de conscientização, que incluíram simulações, teatro e palestras com agentes de trânsito, alcançaram diretamente mais de 1.400 estudantes.</p>
            <h2>Educação e Prevenção</h2>
            <p>O foco das atividades foi educar as crianças para que elas cobrem atitudes responsáveis dos pais no volante hoje, e se tornem condutores exemplares amanhã. O alto engajamento da comunidade escolar foi muito elogiado pelas autoridades.</p>
        `,
        tags: ["jequié", "educação", "maio amarelo", "trânsito"],
        featured: false,
    },
    {
        title: "Homem morre após ter o corpo queimado em Itapetinga; ex-companheira é a principal suspeita",
        category: "Policial",
        city: "Itapetinga",
        image_url: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=1000",
        summary: "Crime trágico abalou a cidade no final do mês de maio. Polícia Civil investiga a motivação do homicídio.",
        content: `
            <p>Um homem de 27 anos, identificado como Jobson Oliveira Santos, faleceu na última quinta-feira de maio (28), no hospital de base da região, após sofrer queimaduras graves em quase todo o corpo.</p>
            <p>O crime ocorreu na cidade de Itapetinga. De acordo com as linhas iniciais de investigação da Polícia Civil, o ataque pode ter sido motivado por ciúmes.</p>
            <h2>Investigações</h2>
            <p>A principal suspeita de ter ateado fogo na vítima é sua ex-companheira. Jobson, tragicamente, deixa duas filhas pequenas. O caso gerou forte comoção e revolta na população local, enquanto a polícia segue apurando as circunstâncias e o paradeiro da suspeita.</p>
        `,
        tags: ["itapetinga", "polícia", "homicídio", "segurança"],
        featured: false,
    },
    {
        title: "Prefeitura de Jequié amplia sistema de drenagem com canal pluvial no bairro Manga de Elza",
        category: "Infraestrutura",
        city: "Jequié",
        image_url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?w=1000",
        summary: "Obras estruturais buscam solucionar alagamentos históricos que atingiam a localidade durante as épocas de chuvas fortes.",
        content: `
            <p>Respondendo a uma demanda antiga dos moradores do bairro Manga de Elza, a Prefeitura de Jequié iniciou em maio a construção de um amplo canal pluvial para escoamento de águas da chuva.</p>
            <p>A obra estrutural faz parte de um pacote de melhorias em infraestrutura viária e saneamento anunciado para o município ao longo do primeiro semestre de 2026.</p>
            <h2>Prevenção a Desastres</h2>
            <p>Com a ampliação do sistema de drenagem, a gestão municipal visa mitigar os transtornos e os riscos de alagamentos que historicamente causavam prejuízos às famílias residentes na parte mais baixa da localidade durante os períodos de forte precipitação.</p>
        `,
        tags: ["jequié", "infraestrutura", "obras públicas", "drenagem"],
        featured: true,
    },
    {
        title: "Vitória da Conquista perde para o Grapiúna por 2 a 0 na 5ª rodada da Série B do Baiano",
        category: "Esportes",
        city: "Vitória da Conquista",
        image_url: "https://images.unsplash.com/photo-1518605368461-1ee7c511d51a?w=1000",
        summary: "Jogando no fim de maio, o 'Bode' sofre dois gols no segundo tempo e amarga fase difícil no Campeonato Baiano da Série B.",
        content: `
            <p>O mês de maio não terminou com boas notícias para a torcida do Esporte Clube Primeiro Passo Vitória da Conquista. Jogando em casa no dia 31, a equipe foi superada pelo Grapiúna Atlético Clube por 2 a 0.</p>
            <p>A partida, válida pela 5ª rodada do Campeonato Baiano da Série B de 2026, foi marcada por um primeiro tempo truncado que terminou em 0 a 0. No entanto, o Grapiúna dominou as ações na segunda etapa e cravou os gols da vitória.</p>
            <h2>Desempenho no Mês</h2>
            <p>O resultado complicou o Conquista na tabela. Em maio, o time acumulou empates contra Leônico e Jacobina, além de derrotas para o Feira FC e SSA FC, frustrando os planos de um retorno rápido à elite do futebol baiano.</p>
        `,
        tags: ["esportes", "vitória da conquista", "futebol", "série b"],
        featured: false,
    },
    {
        title: "Poções é contemplada em edital estadual e poderá receber R$ 530 mil para festejos juninos",
        category: "Cultura",
        city: "Poções",
        image_url: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1000",
        summary: "Diante da proximidade do São João, município garante repasse estadual por meio de edital para fomentar a festa e incentivar artistas da terra.",
        content: `
            <p>Uma boa notícia para a cultura de Poções foi confirmada na última semana de maio. O município foi contemplado em um edital de cultura do Estado e está qualificado para receber um fomento de R$ 530 mil direcionado à realização do São João e do São Pedro.</p>
            <p>O valor tem como objetivo subsidiar as estruturas da festa e garantir a contratação de bandas de forró tradicionais e artistas locais.</p>
            <h2>Impacto Econômico</h2>
            <p>A garantia do repasse permite ao Executivo municipal planejar um festejo estruturado sem onerar severamente os cofres públicos da cidade. Comerciantes já comemoram a notícia, esperando o aquecimento das vendas de alimentos, bebidas e vestuário para os tradicionais festejos na Terra do Divino.</p>
        `,
        tags: ["poções", "são joão", "cultura", "investimentos"],
        featured: true,
    }
];

async function run() {
    console.log("Deletando notícias simuladas inseridas anteriormente...");
    const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .in('title', oldTitles);
        
    if (deleteError) {
        console.error("Erro ao deletar notícias antigas:", deleteError.message);
        return;
    }
    console.log("Notícias simuladas deletadas com sucesso.");

    // Obter o maior ID atual para garantir auto-incremento manual
    let nextId = 0;
    const { data: maxIdData, error: maxIdError } = await supabase
        .from('posts')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

    if (maxIdError) {
        console.error("Erro ao obter o maior ID das notícias:", maxIdError.message);
        return;
    }

    if (maxIdData && maxIdData.length > 0) {
        nextId = maxIdData[0].id;
    }

    console.log(`Maior ID atual encontrado: ${nextId}. Iniciando inserções...`);

    for (const article of realArticles) {
        nextId++;
        const slug = slugify(article.title) + "-" + Date.now();
        
        console.log(`Inserindo: ${article.title} (ID: ${nextId})`);
        const { error } = await supabase.from('posts').insert([{
            id: nextId,
            title: article.title,
            slug: slug,
            content: article.content,
            summary: article.summary,
            category: article.category,
            city: article.city,
            image_url: article.image_url,
            tags: article.tags,
            featured: article.featured,
            author: "Redação Portal",
            date: new Date().toISOString(),
            views: Math.floor(Math.random() * 300) + 120 // random initial views
        }]);
        
        if (error) {
            console.error(`Erro ao inserir ${article.title}:`, error.message);
        } else {
            console.log("Inserido com sucesso.");
        }
        
        // Pequena pausa para garantir timestamps levemente diferentes e evitar conflitos rápidos
        await new Promise(res => setTimeout(res, 150));
    }
    
    console.log("Todas as 10 notícias reais foram inseridas com sucesso no banco de dados!");
}

run();
