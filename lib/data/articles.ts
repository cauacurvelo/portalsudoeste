import { slugify } from "../utils"

export interface Article {
    id: string
    slug: string
    title: string
    summary: string
    content: string
    category: string
    city?: string
    author: string
    date: string
    image: string
    featured?: boolean
    views: number
    tags?: string[]
}

export const ARTICLES: Article[] = [
    {
        id: "1",
        slug: "operacao-policial-pocoes-trafico",
        title: "Operação da Polícia Civil em Poções desarticula grupo especializado em tráfico",
        summary: "Diversos mandados de busca e apreensão foram cumpridos nas primeiras horas desta terça-feira nos bairros Indaiá e Alto da Vitória.",
        content: `A Polícia Civil realizou uma grande operação no município de Poções na manhã desta terça-feira, desarticulando uma organização criminosa especializada no tráfico de entorpecentes.

Segundo informações da delegacia local, a operação — batizada de "Sudoeste Seguro" — contou com o apoio de 40 agentes e resultou no cumprimento de 12 mandados de busca e apreensão nos bairros Indaiá e Alto da Vitória.

Durante a ação, foram apreendidos aproximadamente 5 kg de maconha, 800 gramas de cocaína, uma balança de precisão, dois celulares e R$ 4.500 em espécie. Três suspeitos foram conduzidos à delegacia para prestar depoimento.

O delegado responsável, Dr. Marcos Almeida, informou que as investigações vinham sendo conduzidas há cerca de três meses. "Essa operação é resultado de um trabalho de inteligência que mapeou toda a rede de distribuição na região", afirmou.

A Secretaria de Segurança Pública da Bahia parabenizou a ação e reforçou que novas operações devem ocorrer nos próximos dias em municípios vizinhos.`,
        category: "Policial",
        city: "Poções",
        author: "Redação Portal",
        date: "2026-04-14T08:00:00Z",
        image: "https://picsum.photos/seed/1/800/600",
        featured: true,
        views: 1250,
        tags: ["Polícia Civil", "Operação", "Poções", "Segurança"],
    },
    {
        id: "2",
        slug: "vitoria-da-conquista-investimentos-infraestrutura",
        title: "VDC: Prefeitura anuncia R$ 50 milhões em obras de pavimentação",
        summary: "Recursos serão destinados a mais de 20 bairros da zona oeste da cidade. Prefeita assinou a ordem de serviço ontem.",
        content: `A prefeitura de Vitória da Conquista anunciou ontem um pacote histórico de investimentos em infraestrutura urbana, destinando R$ 50 milhões para obras de pavimentação em mais de 20 bairros da zona oeste.

A prefeita assinou a ordem de serviço em cerimônia realizada no Parque Municipal da Cidade, com a presença de vereadores, secretários municipais e lideranças comunitárias.

"Esse é o maior investimento em pavimentação que Conquista já recebeu de uma só vez. São mais de 80 quilômetros de ruas que serão transformadas", destacou a gestora durante o evento.

As obras terão início nas próximas duas semanas e devem beneficiar diretamente cerca de 150 mil moradores. Os bairros contemplados incluem Jardim Valéria, Brasil, Cruzeiro, Lagoa das Flores e Alto Maron.

O investimento conta com recursos próprios do município e contrapartida do governo estadual através do programa "Bahia Pavimentada".`,
        category: "Política",
        city: "Vitória da Conquista",
        author: "Equipe Sudoeste",
        date: "2026-04-14T10:30:00Z",
        image: "https://picsum.photos/seed/2/800/600",
        featured: true,
        views: 3420,
        tags: ["Vitória da Conquista", "Infraestrutura", "Pavimentação"],
    },
    {
        id: "3",
        slug: "jequie-queda-casos-gripe",
        title: "Jequié registra queda de 40% nos casos de síndromes gripais",
        summary: "Dados da Secretaria Municipal de Saúde mostram que a curva de contágio começou a baixar após campanha intensiva.",
        content: `A cidade de Jequié respira um pouco mais aliviada com os novos números da saúde pública divulgados pela Secretaria Municipal de Saúde nesta semana.

De acordo com o boletim epidemiológico, houve uma redução de 40% nos casos de síndromes gripais em comparação com o mês anterior. O número de atendimentos por sintomas respiratórios nas UPAs caiu de 1.200 para 720.

A secretária de Saúde, Dra. Fernanda Costa, atribuiu a melhora à campanha intensiva de vacinação realizada nas últimas semanas. "Conseguimos vacinar mais de 60% da população-alvo em apenas 20 dias", explicou.

As unidades básicas de saúde continuam oferecendo vacinas contra a gripe e COVID-19 para todos os públicos.`,
        category: "Saúde",
        city: "Jequié",
        author: "Maria Oliveira",
        date: "2026-04-13T14:15:00Z",
        image: "https://picsum.photos/seed/3/800/600",
        featured: true,
        views: 890,
        tags: ["Jequié", "Saúde", "Gripe", "Vacinação"],
    },
    {
        id: "4",
        slug: "planalto-festa-padroeiro-programacao",
        title: "Planalto divulga programação completa da festa do padroeiro 2026",
        summary: "Atrações nacionais e locais se apresentam na praça principal entre os dias 20 e 24 de maio.",
        content: `A tradicional festa de Planalto já tem data e atrações confirmadas. A Prefeitura Municipal divulgou a programação completa dos festejos do padroeiro São José, que acontecerão entre os dias 20 e 24 de maio.

O evento contará com cinco noites de shows na praça principal. "Preparamos uma programação diversificada que atende a todos os gostos. Teremos desde a parte religiosa até os shows e a feira gastronômica", disse o secretário de Cultura.

A estrutura do palco está sendo reforçada para receber um público estimado de 30 mil pessoas por noite. A Polícia Militar e o Corpo de Bombeiros já articulam o plano de segurança.`,
        category: "Cultura",
        city: "Planalto",
        author: "Redação Portal",
        date: "2026-04-14T16:00:00Z",
        image: "https://picsum.photos/seed/4/800/600",
        featured: true,
        views: 2100,
        tags: ["Planalto", "Cultura", "Festa", "Padroeiro"],
    },
    {
        id: "5",
        slug: "brumado-mineradora-novos-empregos",
        title: "Nova mineradora em Brumado deve gerar 500 empregos diretos",
        summary: "Processo seletivo começa no próximo mês para diversas áreas técnicas e operacionais.",
        content: `Brumado continua se consolidando como polo de mineração no estado da Bahia. Uma nova empresa anunciou a instalação de uma unidade de beneficiamento de minerais, com previsão de gerar 500 empregos diretos e 1.500 indiretos.

O investimento total é estimado em R$ 120 milhões e a unidade deverá entrar em operação no segundo semestre de 2026. As vagas abrangem operador de maquinário, técnico de mineração, engenheiro de minas e funções administrativas.

O prefeito de Brumado celebrou a notícia. "Fizemos parcerias com o SENAI e o IFBA para preparar nossa mão de obra para essas oportunidades", ressaltou.`,
        category: "Economia",
        city: "Brumado",
        author: "João Silva",
        date: "2026-04-14T09:45:00Z",
        image: "https://picsum.photos/seed/5/800/600",
        featured: false,
        views: 5600,
        tags: ["Brumado", "Mineração", "Empregos", "Economia"],
    },
    {
        id: "6",
        slug: "bahia-educacao-medalhas-olimpiada",
        title: "Escolas do Sudoeste levam 15 medalhas em Olimpíada de Matemática",
        summary: "Alunos de colégios públicos da região se destacam em competição nacional.",
        content: `O Sudoeste da Bahia conquistou 15 medalhas na OBMEP — 5 de ouro, 4 de prata e 6 de bronze — distribuídas entre estudantes de cinco municípios da região.

O destaque foi a estudante Ana Clara Santos, de 15 anos, do Colégio Estadual de Poções, que conquistou medalha de ouro com a maior pontuação do estado da Bahia. "Estudo matemática todos os dias, é minha paixão", declarou a jovem medalhista.

A Secretaria Estadual de Educação anunciou que os medalhistas receberão bolsas de estudo e participarão de um programa de mentoria com professores universitários.`,
        category: "Educação",
        author: "Equipe Sudoeste",
        date: "2026-04-13T11:00:00Z",
        image: "https://picsum.photos/seed/6/800/600",
        views: 1100,
        tags: ["Educação", "Olimpíada", "Matemática"],
    },
    {
        id: "7",
        slug: "itapetinga-pecuaria-precos-alta",
        title: "Pecuária em alta: Itapetinga registra valorização no preço da arroba",
        summary: "Setor produtivo comemora números positivos no primeiro trimestre do ano.",
        content: `Itapetinga, a capital da pecuária da Bahia, vive um momento positivo com a valorização de 18% no preço da arroba do boi gordo, alcançando R$ 295.

Os pecuaristas atribuem a alta à crescente demanda do mercado externo. "Nossa carne é reconhecida pela qualidade e isso se reflete nos preços", afirmou o presidente do Sindicato Rural.

A Feira Agropecuária de Itapetinga, prevista para junho, já tem mais de 200 expositores confirmados e deve movimentar R$ 30 milhões.`,
        category: "Economia",
        city: "Itapetinga",
        author: "Redação Portal",
        date: "2026-04-14T12:00:00Z",
        image: "https://picsum.photos/seed/7/800/600",
        views: 1750,
        tags: ["Itapetinga", "Pecuária", "Economia", "Agronegócio"],
    },
    {
        id: "8",
        slug: "barra-do-choca-cafe-safra",
        title: "Produtores de Barra do Choça iniciam colheita da safra de café",
        summary: "Expectativa é de alta produtividade e grãos de excelente qualidade tipo exportação.",
        content: `O aroma de café toma conta de Barra do Choça, que iniciou oficialmente a colheita da safra 2026. O município projeta colher 2,5 milhões de sacas de 60kg, um aumento de 12% em relação ao ano anterior.

"As condições climáticas foram favoráveis. Estamos produzindo cafés especiais que atendem aos padrões mais rigorosos do mercado internacional", explicou o presidente da cooperativa.

Cerca de 3 mil famílias dependem diretamente da cafeicultura. O café de Barra do Choça é exportado para mais de 15 países.`,
        category: "Economia",
        city: "Barra do Choça",
        author: "João Silva",
        date: "2026-04-14T15:20:00Z",
        image: "https://picsum.photos/seed/8/800/600",
        views: 920,
        tags: ["Barra do Choça", "Café", "Safra", "Agronegócio"],
    },
    {
        id: "9",
        slug: "pocoes-reforma-praca-central",
        title: "Poções: Praça Ruy Barbosa recebe reforma completa e ganha novo paisagismo",
        summary: "Obra de revitalização inclui nova iluminação LED, bancos, playground e área para eventos ao ar livre.",
        content: `A Praça Ruy Barbosa, cartão-postal de Poções, recebeu uma reforma completa com investimento de R$ 2,8 milhões. O espaço agora conta com acessibilidade total, piso tátil, rampas de acesso e uma fonte luminosa.

"Era um desejo antigo da população e finalmente conseguimos concretizar", declarou o prefeito durante a inauguração.

A obra faz parte do programa municipal de revitalização urbana, que prevê a reforma de outras três praças em bairros periféricos ainda este ano.`,
        category: "Notícias",
        city: "Poções",
        author: "Redação Portal",
        date: "2026-04-15T09:00:00Z",
        image: "https://picsum.photos/seed/9/800/600",
        featured: false,
        views: 1890,
        tags: ["Poções", "Reforma", "Praça", "Urbanismo"],
    },
    {
        id: "10",
        slug: "conquista-uesb-pesquisa-inovacao",
        title: "UESB conquista prêmio nacional de inovação com pesquisa sobre caatinga",
        summary: "Projeto desenvolvido em Vitória da Conquista foi reconhecido pelo CNPq como referência nacional.",
        content: `A UESB conquistou o Prêmio Nacional de Inovação Científica do CNPq com um projeto sobre recuperação de áreas degradadas da caatinga.

A pesquisa desenvolveu uma técnica que aumenta em 300% a taxa de sobrevivência de mudas nativas no semiárido. A técnica já está sendo replicada em 12 municípios do Sudoeste Baiano.

A premiação inclui R$ 500 mil para continuidade das pesquisas e convite para apresentação na COP 31.`,
        category: "Educação",
        city: "Vitória da Conquista",
        author: "Maria Oliveira",
        date: "2026-04-15T14:30:00Z",
        image: "https://picsum.photos/seed/10/800/600",
        featured: false,
        views: 2340,
        tags: ["UESB", "Inovação", "Pesquisa", "Caatinga"],
    },
    {
        id: "11",
        slug: "jequie-campeonato-regional-futebol",
        title: "Jequié sediará fase final do Campeonato Regional de Futebol Amador",
        summary: "Oito equipes classificadas disputam o título no Estádio Waldomiro Borges a partir do próximo sábado.",
        content: `O Estádio Municipal Waldomiro Borges será palco da fase final do Campeonato Regional de Futebol Amador do Sudoeste Baiano 2026.

Oito equipes de diferentes municípios se classificaram. "É o evento esportivo mais aguardado da região. Esperamos mais de 5 mil pessoas por jogo", informou o presidente da Liga.

A prefeitura realizou melhorias no estádio e a entrada será gratuita em todos os jogos. As partidas serão transmitidas ao vivo pelas redes sociais do Portal do Sudoeste.`,
        category: "Esportes",
        city: "Jequié",
        author: "Equipe Sudoeste",
        date: "2026-04-16T08:00:00Z",
        image: "https://picsum.photos/seed/11/800/600",
        featured: false,
        views: 3100,
        tags: ["Jequié", "Futebol", "Esportes", "Campeonato"],
    },
    {
        id: "12",
        slug: "pocoes-feira-livre-patrimonio",
        title: "Feira livre de Poções é reconhecida como patrimônio cultural imaterial",
        summary: "Tradição de mais de 100 anos recebe reconhecimento oficial do governo estadual.",
        content: `A tradicional feira livre de Poções foi oficialmente reconhecida como Patrimônio Cultural Imaterial do Estado da Bahia pelo IPAC.

A feira, que existe há mais de 100 anos, reúne semanalmente mais de 300 feirantes e 5 mil frequentadores. "É uma conquista histórica. A feira é mais do que comércio, é onde a cultura do nosso povo se encontra", emocionou-se o secretário de Cultura.

Com o título, a feira passa a contar com proteção legal e acesso a recursos para melhorias de infraestrutura.`,
        category: "Cultura",
        city: "Poções",
        author: "Redação Portal",
        date: "2026-04-16T11:00:00Z",
        image: "https://picsum.photos/seed/12/800/600",
        featured: true,
        views: 4200,
        tags: ["Poções", "Feira Livre", "Patrimônio Cultural"],
    },
]

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
    return ARTICLES.filter(a => a.category.toLowerCase() === category.toLowerCase())
}

export function getArticlesByCity(citySlug: string): Article[] {
    return ARTICLES.filter(a => {
        if (!a.city) return false
        const normalizedCity = slugify(a.city)
        return normalizedCity === slugify(citySlug) || a.city.toLowerCase() === citySlug.toLowerCase()
    })
}

export function getFeaturedArticles(limit = 5): Article[] {
    return ARTICLES.filter(a => a.featured).slice(0, limit)
}

export function getLatestArticles(limit = 6): Article[] {
    return [...ARTICLES]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

export function getMostReadArticles(limit = 5): Article[] {
    return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit)
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
    return ARTICLES
        .filter(a => a.id !== article.id && (a.category === article.category || a.city === article.city))
        .slice(0, limit)
}

export function searchArticles(query: string): Article[] {
    const q = query.toLowerCase()
    return ARTICLES.filter(
        a => a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q) ||
            a.tags?.some(t => t.toLowerCase().includes(q))
    )
}
