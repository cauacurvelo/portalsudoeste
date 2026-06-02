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

const articles = [
    {
        title: "Polo logístico de Vitória da Conquista atrai R$ 50 milhões em novos investimentos e promete gerar 800 empregos",
        category: "Economia",
        city: "Vitória da Conquista",
        image_url: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1000",
        summary: "O novo centro de distribuição na BR-116 consolidará a cidade como o principal hub logístico do Sudoeste Baiano, fortalecendo a economia local.",
        content: `
            <p>A economia do Sudoeste Baiano recebeu uma excelente notícia nesta semana com o anúncio de um novo aporte financeiro destinado ao setor logístico de Vitória da Conquista. Com investimentos previstos na ordem de R$ 50 milhões, a construção de um moderno centro de distribuição às margens da BR-116 promete transformar a dinâmica econômica da região.</p>
            <p>O empreendimento, que já está em fase de terraplanagem, terá capacidade para atender não apenas o interior da Bahia, mas também o norte de Minas Gerais. Segundo representantes do consórcio responsável pela obra, a localização estratégica de Vitória da Conquista foi o fator determinante para a escolha da cidade.</p>
            <h2>Geração de Empregos e Renda</h2>
            <p>A expectativa é que, durante a fase de obras, sejam criados cerca de 300 postos de trabalho diretos. Após a inauguração, prevista para o primeiro semestre do próximo ano, o polo logístico deverá gerar até 800 empregos, desde operadores de empilhadeira até cargos administrativos e de gestão de frota.</p>
            <p><em>"Vitória da Conquista já possui uma vocação natural para o comércio e serviços. Este novo polo logístico apenas reafirma nossa posição como a capital do Sudoeste, trazendo desenvolvimento sustentável e oportunidades para a nossa juventude"</em>, destacou um especialista em economia regional.</p>
        `,
        tags: ["economia", "investimentos", "empregos", "vitória da conquista"],
        featured: true,
    },
    {
        title: "Prefeitura de Poções inicia reforma e ampliação de escolas na zona rural do município",
        category: "Educação",
        city: "Poções",
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000",
        summary: "Com recursos próprios, o executivo municipal garante melhorias na infraestrutura escolar, beneficiando centenas de alunos das comunidades rurais.",
        content: `
            <p>Buscando oferecer melhores condições de ensino para as comunidades mais afastadas, a Prefeitura de Poções anunciou o início imediato de um amplo pacote de reformas e ampliações nas escolas da zona rural do município. As obras já começaram em três unidades de ensino e devem se estender para outras regiões até o fim do ano.</p>
            <p>As intervenções incluem a troca de telhados, renovação das redes elétrica e hidráulica, construção de novas salas de aula para atender à demanda crescente, além da instalação de áreas de lazer cobertas e refeitórios mais amplos.</p>
            <h2>Foco na Qualidade do Ensino</h2>
            <p>De acordo com a Secretaria Municipal de Educação, o objetivo é garantir que os alunos da zona rural tenham acesso à mesma infraestrutura e conforto oferecidos nas escolas da sede. Além das obras físicas, as unidades também receberão novo mobiliário e equipamentos tecnológicos para auxiliar os professores em sala de aula.</p>
            <p>A comunidade tem recebido a iniciativa com entusiasmo. Moradores destacam que há muitos anos algumas dessas escolas não passavam por manutenções significativas, e que as melhorias trarão mais segurança e motivação para os estudantes e profissionais da educação.</p>
        `,
        tags: ["poções", "educação", "zona rural", "obras públicas"],
        featured: false,
    },
    {
        title: "Operação policial desarticula quadrilha de roubo de veículos que atuava em Jequié e região",
        category: "Policial",
        city: "Jequié",
        image_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1000",
        summary: "Ação conjunta resultou na recuperação de veículos e na prisão de suspeitos após meses de investigação do serviço de inteligência.",
        content: `
            <p>Uma grande operação deflagrada nas primeiras horas da manhã de hoje pelas forças de segurança resultou na desarticulação de um esquema sofisticado de roubo, desmanche e clonagem de veículos que tinha Jequié como uma de suas bases operacionais.</p>
            <p>A ação contou com efetivos da Polícia Civil e da Polícia Militar, e foi o resultado de meses de investigações e cruzamento de dados de inteligência. Foram cumpridos diversos mandados de busca e apreensão, além de prisões preventivas em diferentes bairros da "Cidade Sol" e municípios vizinhos.</p>
            <h2>Como o grupo atuava</h2>
            <p>As investigações apontam que os suspeitos furtavam caminhonetes e carros populares em outras cidades, trazendo os veículos para galpões clandestinos na região de Jequié. Nesses locais, os veículos tinham seus chassis adulterados para serem revendidos em feiras livres do interior com documentação falsa, ou eram desmontados para a venda de peças no mercado ilegal.</p>
            <p>O comandante da operação ressaltou a importância da denúncia anônima e do trabalho integrado das polícias. <em>"Tiramos de circulação indivíduos perigosos que causavam enormes prejuízos aos trabalhadores da nossa região. A operação continuará para identificar possíveis receptadores"</em>, informou.</p>
        `,
        tags: ["jequié", "segurança pública", "operação policial", "veículos"],
        featured: false,
    },
    {
        title: "Campanha de vacinação contra a Influenza supera expectativas e bate meta em Planalto",
        category: "Saúde",
        city: "Planalto",
        image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000",
        summary: "Adesão massiva de idosos e crianças garantiu que a cidade alcançasse a cobertura vacinal antes do prazo estipulado pelo Ministério da Saúde.",
        content: `
            <p>O município de Planalto tem motivos de sobra para comemorar no setor de saúde pública. A Secretaria de Saúde informou nesta sexta-feira que a cidade não apenas alcançou, mas superou a meta estabelecida pelo Ministério da Saúde para a Campanha Nacional de Vacinação contra a Influenza (Gripe).</p>
            <p>O sucesso da campanha foi impulsionado pelo chamado "Dia D", quando Unidades de Saúde da Família (USF) abriram excepcionalmente aos finais de semana, e por equipes móveis que percorreram zonas rurais, garantindo que pessoas com dificuldade de locomoção também fossem imunizadas.</p>
            <h2>Prevenção no Inverno</h2>
            <p>Com a aproximação do inverno, período em que as doenças respiratórias se tornam mais frequentes na região Sudoeste devido à queda brusca de temperatura, a imunização de grupos prioritários — como idosos, gestantes e crianças — é fundamental para evitar a sobrecarga no sistema de saúde local.</p>
            <p>Profissionais de saúde ressaltam que as vacinas continuam disponíveis para o público em geral nas unidades básicas, até o término dos estoques. A prefeitura aproveitou para agradecer o empenho dos técnicos de enfermagem e agentes de saúde que não mediram esforços durante a campanha.</p>
        `,
        tags: ["planalto", "saúde", "vacinação", "prevenção"],
        featured: false,
    },
    {
        title: "Safra de café em Brumado e Barra do Choça anima produtores rurais após chuvas regulares",
        category: "Agricultura",
        city: "Barra do Choça",
        image_url: "https://images.unsplash.com/photo-1595806653912-7065f4d8431d?w=1000",
        summary: "Condições climáticas favoráveis impulsionam a colheita, garantindo grãos de alta qualidade e movimentando a economia agrícola local.",
        content: `
            <p>Após anos de irregularidade climática que deixaram os agricultores apreensivos, a atual safra de café está sendo celebrada em toda a região Sudoeste, com destaque para os municípios de Barra do Choça e as áreas produtivas no entorno de Brumado. As chuvas que caíram no momento certo do desenvolvimento da planta garantiram uma florada vigorosa e frutos de excelente qualidade.</p>
            <p>Conhecida como uma das principais bacias produtoras de café da Bahia, Barra do Choça já observa uma movimentação intensa de trabalhadores sazonais nas lavouras, o que injeta recursos diretamente no comércio local e fortalece a economia da cidade.</p>
            <h2>Qualidade que Atrai Mercados</h2>
            <p>Especialistas e classificadores de café apontam que a bebida extraída dos grãos desta safra apresenta notas sensoriais superiores. A altitude e o clima da região já favorecem o cultivo de cafés especiais, e o clima ameno deste ano ajudou na maturação lenta e uniforme do fruto.</p>
            <p><em>"Este é o ano de recuperação para muitos de nós. A qualidade do café cereja colhido está impressionante, e o mercado interno e externo está pagando um preço justo. Isso dá fôlego para investirmos em novas tecnologias de secagem na próxima safra"</em>, comemorou um pequeno produtor rural.</p>
        `,
        tags: ["agricultura", "café", "barra do choça", "economia"],
        featured: true,
    },
    {
        title: "Cultura nordestina em alta: Itapetinga anuncia grande festival de São João antecipado",
        category: "Cultura",
        city: "Itapetinga",
        image_url: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1000",
        summary: "A capital da pecuária promete aquecer a economia e o turismo com festejos juninos que valorizam artistas regionais e as tradições baianas.",
        content: `
            <p>Para quem já está com saudades dos festejos juninos, Itapetinga trará uma excelente oportunidade de arrastar o pé. A prefeitura municipal confirmou a realização de um grande Festival da Cultura Nordestina, que funcionará como um 'esquenta' oficial para o São João deste ano.</p>
            <p>A festa, que ocorrerá no principal parque de exposições da cidade, contará com infraestrutura completa de segurança, barracas com comidas típicas, quadrilhas estilizadas e um palco principal que receberá grandes nomes do forró e artistas locais de destaque.</p>
            <h2>Valorização do Comércio e Turismo</h2>
            <p>O evento não é apenas uma manifestação cultural, mas um motor econômico vital para a cidade. O setor hoteleiro já registra aumento nas reservas, e os comerciantes locais se preparam para o aumento das vendas de vestuário e alimentação.</p>
            <p>O secretário de Cultura ressaltou o compromisso do evento em equilibrar a tradição com as novas tendências do entretenimento. A expectativa é que o festival atraia visitantes de toda a região do Sudoeste e Médio Sudoeste baiano, consolidando Itapetinga como uma das principais rotas culturais do estado.</p>
        `,
        tags: ["itapetinga", "são joão", "cultura", "turismo"],
        featured: false,
    },
    {
        title: "Obras de infraestrutura viária no Sudoeste avançam e prometem maior segurança aos motoristas",
        category: "Notícias",
        city: "Vitória da Conquista",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000",
        summary: "Intervenções importantes em estradas estaduais e federais da região chegam a 60% de conclusão, aliviando gargalos históricos.",
        content: `
            <p>Quem transita rotineiramente pelo Sudoeste Baiano tem notado as intensas movimentações de máquinas e operários ao longo das principais vias de escoamento da região. As obras de recapeamento e duplicação de trechos críticos de rodovias estaduais e trechos da BR-116 avançaram significativamente este mês, atingindo a marca de 60% de conclusão.</p>
            <p>Há anos reivindicadas por motoristas, associações comerciais e moradores locais, as melhorias visam reduzir drasticamente o índice de acidentes e facilitar o transporte de mercadorias entre o Sudeste do Brasil, a Bahia e o Nordeste.</p>
            <h2>Impacto Regional</h2>
            <p>Além do asfalto novo, os projetos contemplam a instalação de sinalização vertical e horizontal com material de alta refletividade, construção de acostamentos pavimentados e alças de acesso mais seguras para municípios menores, que antes sofriam com cruzamentos perigosos.</p>
            <p>Autoridades de trânsito pedem atenção redobrada aos motoristas que passam pelos trechos em obra (pare e siga), reforçando que os transtornos temporários darão lugar a uma malha viária moderna e segura, compatível com a importância econômica do Sudoeste baiano.</p>
        `,
        tags: ["infraestrutura", "estradas", "sudoeste", "obras"],
        featured: true,
    },
    {
        title: "Campeonato Municipal de Poções empolga torcedores e revela jovens talentos do futebol",
        category: "Esportes",
        city: "Poções",
        image_url: "https://images.unsplash.com/photo-1518605368461-1ee7c511d51a?w=1000",
        summary: "Estádio Heraldão lotado a cada rodada prova a força do esporte amador na Terra do Divino, promovendo a integração e o lazer.",
        content: `
            <p>A paixão do poçoense pelo futebol está mais viva do que nunca. O Campeonato Municipal de Poções vem registrando excelentes públicos a cada fim de semana no Estádio Municipal Heraldo Curvelo (Heraldão), transformando os domingos da cidade em verdadeiros festivais esportivos e familiares.</p>
            <p>Com equipes representando diversos bairros e localidades rurais, a competição deste ano está marcada pelo alto nível técnico e pelo surgimento de jovens promessas que já começam a atrair a atenção de olheiros de clubes maiores do estado.</p>
            <h2>Esporte como Ferramenta Social</h2>
            <p>Mais do que uma competição pela taça, o campeonato cumpre um importante papel social. O evento movimenta ambulantes locais, garantindo renda extra para diversas famílias, e oferece uma opção de lazer saudável para a juventude.</p>
            <p>A Liga Desportiva Poçoense (LDP), em parceria com o poder público, tem garantido organização impecável, arbitragem profissional e segurança, criando um ambiente acolhedor para que as torcidas acompanhem os jogos de forma pacífica. A final do campeonato promete casa cheia e uma festa inesquecível para o esporte local.</p>
        `,
        tags: ["poções", "esportes", "futebol amador", "heraldão"],
        featured: false,
    },
    {
        title: "Comércio do Sudoeste adota inovações digitais para alavancar vendas na região",
        category: "Economia",
        city: "Jequié",
        image_url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1000",
        summary: "Lojistas investem em vendas multicanal e marketing nas redes sociais, mostrando a resiliência e adaptação do setor varejista.",
        content: `
            <p>Os tempos em que o comércio dependia apenas de portas abertas e vitrines arrumadas ficaram para trás. Lojistas de cidades como Jequié, Vitória da Conquista e Brumado estão liderando uma verdadeira transformação digital no varejo regional, integrando o atendimento físico a robustas estratégias online.</p>
            <p>Aplicativos de mensagens, perfis ativos no Instagram e e-commerces simplificados tornaram-se ferramentas diárias para os comerciantes. A estratégia 'omnichannel' permite que o cliente do interior veja o produto na internet, tire dúvidas pelo celular e, muitas vezes, retire na loja física no mesmo dia.</p>
            <h2>Aumento no Faturamento</h2>
            <p>Câmaras de Dirigentes Lojistas (CDLs) da região confirmam a tendência. Estabelecimentos que abraçaram as inovações digitais registraram aumentos substanciais de vendas em comparação com aqueles que operam exclusivamente offline. Essa adaptação tem sido fundamental não só para reter o cliente local, mas também para alcançar consumidores de cidades vizinhas.</p>
            <p>Sebrae e associações comerciais têm oferecido cursos e capacitações constantes sobre marketing digital e logística e-commerce, garantindo que o pequeno e médio empresário do Sudoeste baiano não fique para trás na nova economia conectada.</p>
        `,
        tags: ["comércio", "economia", "inovação", "jequié", "varejo"],
        featured: false,
    },
    {
        title: "Hospital Geral de Vitória da Conquista recebe novos leitos e equipamentos de alta complexidade",
        category: "Saúde",
        city: "Vitória da Conquista",
        image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000",
        summary: "Governo do Estado entrega melhorias significativas na infraestrutura do HGVC, ampliando a capacidade de atendimento a traumas e urgências.",
        content: `
            <p>O Hospital Geral de Vitória da Conquista (HGVC), principal referência de saúde para dezenas de municípios do Sudoeste Baiano, recebeu nesta semana um reforço essencial para sua capacidade operacional. A unidade hospitalar passou por adequações estruturais e foi equipada com novos leitos de enfermaria e de Terapia Intensiva (UTI).</p>
            <p>A entrega, formalizada por representantes da Secretaria de Saúde do Estado (Sesab), inclui também aparelhos de tomografia e ultrassonografia de última geração, que irão acelerar os diagnósticos e diminuir a fila de espera por exames complexos.</p>
            <h2>Referência Regional Fortalecida</h2>
            <p>Como o HGVC atende pacientes vítimas de acidentes nas rodovias da região e casos de alta complexidade que não podem ser resolvidos em hospitais municipais menores, a agilidade proporcionada pelos novos equipamentos pode significar a diferença entre a vida e a morte.</p>
            <p>Além da estrutura física e tecnológica, o anúncio veio acompanhado da convocação de novos profissionais de saúde, visando suprir as escalas médicas e garantir atendimento mais humanizado. As melhorias reforçam a vocação de Vitória da Conquista como pólo médico de excelência na Bahia.</p>
        `,
        tags: ["saúde", "vitória da conquista", "hgvc", "hospitais"],
        featured: true,
    }
]

async function seed() {
    let nextId = 0;
    const { data: maxIdData } = await supabase.from('posts').select('id').order('id', { ascending: false }).limit(1);
    if (maxIdData && maxIdData.length > 0) {
        nextId = maxIdData[0].id;
    }

    for (const article of articles) {
        nextId++;
        const slug = slugify(article.title) + "-" + Date.now();
        
        console.log("Inserting: " + article.title);
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
            views: Math.floor(Math.random() * 500) + 50 // some random initial views
        }])
        
        if (error) {
            console.error("Failed to insert " + article.title + ":", error.message)
        } else {
            console.log("Successfully inserted.")
        }
        
        // Wait a small amount to ensure distinct timestamps
        await new Promise(res => setTimeout(res, 200))
    }
    console.log("Done seeding.")
}

seed()
