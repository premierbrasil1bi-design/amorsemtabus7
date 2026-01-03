export const siteData = {
  general: {
    name: "Amor Sem Tabus",
    description: "Curadoria editorial de títulos sobre relacionamentos reais.",
    contactEmail: "editoria@amorsemtabus7.com",
    footerDisclaimer: "Nota de Transparência: Este site é uma vitrine editorial. As avaliações e depoimentos exibidos fazem parte da curadoria do projeto e não são gerados automaticamente por algoritmos.",
    contentWarning: "Conteúdo destinado ao público adulto (+18)."
  },
  home: {
    headline: "Relacionamentos reais exigem conversas reais.",
    subheadline: "O amor não é intuitivo. É uma habilidade que se aprende. Nossa curadoria seleciona obras que ensinam o que ninguém te contou sobre desejo, convivência e crises.",
    cta: "Explorar Biblioteca",
  },
  about: {
    title: "Sobre a Curadoria",
    text: [
      "O 'Amor Sem Tabus' não é um algoritmo. É um projeto editorial humano.",
      "Nossa missão é filtrar o ruído do mercado de autoajuda e entregar apenas obras que tratam o relacionamento com a profundidade e a maturidade que ele exige.",
      "Não acreditamos em fórmulas mágicas para 'salvar seu casamento em 7 dias'. Acreditamos em autoconhecimento, conversas difíceis e reeducação emocional.",
      "Transparência: Todo o conteúdo deste site, incluindo as avaliações destacadas, é selecionado e editado manualmente por nossa equipe para garantir a coerência e a qualidade da informação apresentada."
    ]
  },
  editorial: {
    title: "Nosso Processo de Curadoria",
    description: "Cada livro listado aqui passou por um crivo rigoroso. Não vendemos espaço publicitário; vendemos confiança.",
    criteria: [
      { title: "Responsabilidade", desc: "Rejeitamos obras que promovem manipulação, jogos de poder ou promessas de resultados milagrosos." },
      { title: "Aplicabilidade", desc: "Priorizamos livros com ferramentas práticas para lidar com conflitos reais, fugindo de teorias abstratas." },
      { title: "Profundidade", desc: "Buscamos autores que provocam reflexão e autocrítica, em vez de apenas validar o ego do leitor." }
    ]
  },
  books: [
    {
      id: 1,
      slug: "dialogos-dificeis",
      title: "Diálogos Difíceis",
      author: "Ana K. Silva",
      category: "Comunicação",
      cover: "https://placehold.co/400x600/5D1822/FDFBF7?text=Dialogos+Dificeis",
      price: "R$ 29,90",
      description: "Por que vocês brigam sempre pelos mesmos motivos? Um guia prático para quebrar ciclos de acusação e defesa. Aprenda a falar o que sente sem destruir o outro.",
      excerpt: `
        <p>A maioria das conversas difíceis não termina mal porque o assunto é delicado, mas porque entramos nelas armados. Imagine a cena: você espera seu parceiro chegar em casa, ensaiando mentalmente o discurso sobre a toalha molhada, o atraso ou a falta de atenção. Quando a porta se abre, você não está vendo a pessoa que ama; você está vendo um réu.</p>
        <p>"Precisamos conversar" tornou-se o código universal para "vou listar suas falhas". E a reação natural de qualquer ser humano sob ataque é se defender. O escudo sobe. A escuta desliga. O que era para ser uma ponte vira um muro.</p>
        <p>Neste capítulo, vamos desmontar essa dinâmica. Não vou te ensinar a "ganhar" discussões. Vou te ensinar a construir um espaço seguro onde a vulnerabilidade seja mais forte que o orgulho. Porque, no fim do dia, você prefere ter razão ou ser feliz?</p>
      `,
      targetAudience: "Casais que se amam, mas não conseguem se entender.",
      editorialReview: {
        stars: 5,
        text: "Avaliação Editorial: Uma leitura desconfortável e necessária. A autora remove a culpa e coloca a responsabilidade no centro da mesa."
      },
      testimonials: [
        { name: "Carlos M.", role: "Comprador de eBook", text: "A leitura é direta, desconfortável em alguns pontos, mas extremamente honesta. Mudou minha forma de ouvir minha esposa.", stars: 5 },
        { name: "Juliana S.", role: "Compradora de eBook", text: "Finalmente um livro que não fica passando a mão na cabeça. Direto ao ponto.", stars: 5 }
      ],
      buyLink: "https://hotmart.com/exemplo1"
    },
    {
      id: 2,
      slug: "alem-do-desejo",
      title: "Além do Desejo",
      author: "Marcos V.",
      category: "Intimidade",
      cover: "https://placehold.co/400x600/1F1F1F/FDFBF7?text=Alem+do+Desejo",
      price: "R$ 47,90",
      description: "O desejo não morre, ele muda de lugar. Uma investigação profunda sobre a libido em relacionamentos de longo prazo e como reencontrar a intimidade sem pressão ou performance.",
      excerpt: `
        <p>A mentira mais contada sobre o casamento é que a paixão deve durar para sempre da mesma forma que começou. Nós nos apegamos à memória daquele frio na barriga dos primeiros meses como se fosse o único indicador válido de amor. Se o coração não dispara, achamos que o amor morreu.</p>
        <p>Mas o desejo em uma relação longa não é espontâneo; ele é cultivado. Ele deixa de ser um incêndio florestal incontrolável para se tornar uma fogueira doméstica: aquece, conforta, mas precisa de lenha constante.</p>
        <p>Você parou de desejar seu parceiro ou parou de ver seu parceiro como alguém desejável? A rotina, os boletos e a familiaridade excessiva são os assassinos silenciosos do erotismo. Vamos investigar como trazer o mistério de volta para a sala de estar.</p>
      `,
      targetAudience: "Relacionamentos longos (5+ anos) em fase morna.",
      editorialReview: {
        stars: 4,
        text: "Avaliação Editorial: Foge do clichê de 'apimentar a relação'. É sobre conexão, não sobre acrobacias."
      },
      testimonials: [
        { name: "Roberto F.", role: "Comprador de eBook", text: "Tirou um peso das minhas costas. Entender que a fase da paixão acaba para dar lugar a algo melhor foi libertador.", stars: 5 },
        { name: "Mariana R.", role: "Compradora de eBook", text: "Texto maduro. Recomendo para quem tem coragem de se olhar no espelho.", stars: 4 }
      ],
      buyLink: "https://kiwify.com.br/exemplo2"
    },
    {
      id: 3,
      slug: "ciume-e-controle",
      title: "Ciúme e Controle",
      author: "Dra. Helena Costa",
      category: "Autoconhecimento",
      cover: "https://placehold.co/400x600/3A0E14/FDFBF7?text=Ciume+e+Controle",
      price: "R$ 35,00",
      description: "Onde termina o cuidado e começa a posse? Entenda as raízes da insegurança e aprenda a construir confiança sólida, começando por você mesmo.",
      excerpt: `
        <p>O ciúme não é uma prova de amor. É uma prova de insegurança. Quando checamos o celular do outro, quando monitoramos horários, quando interrogamos sobre cada "like" na rede social, não estamos protegendo a relação; estamos sufocando-a.</p>
        <p>A raiz do controle é o medo profundo de não ser suficiente. Acreditamos que, se soltarmos as rédeas, o outro vai embora. Mas a verdade brutal é: quem quer ir, vai. Com ou sem vigilância.</p>
        <p>A única forma de manter alguém ao seu lado de verdade é pela liberdade. Parece paradoxal, eu sei. Mas a confiança só existe onde há a possibilidade de traição. Se você precisa vigiar para confiar, você já não confia.</p>
      `,
      targetAudience: "Pessoas que sofrem com a própria insegurança.",
      editorialReview: {
        stars: 5,
        text: "Avaliação Editorial: Denso. A autora disseca o ciúme de forma cirúrgica. Não é para quem quer apenas conselhos superficiais."
      },
      testimonials: [
        { name: "Fernanda T.", role: "Compradora de eBook", text: "Dói ler, mas cura. Me vi em várias páginas.", stars: 5 }
      ],
      buyLink: "https://hotmart.com/exemplo3"
    },
    {
      id: 4,
      slug: "o-mito-da-metade",
      title: "O Mito da Metade da Laranja",
      author: "Dra. Letícia Mayer",
      category: "Autoconhecimento",
      cover: "https://placehold.co/400x600/C5A059/1F1F1F?text=O+Mito+da+Metade",
      price: "R$ 32,90",
      description: "Por que ainda buscamos alguém que nos complete? Descubra como a ideia do amor romântico idealizado pode estar sabotando suas relações reais e aprenda a amar a partir da inteireza, não da falta.",
      excerpt: `
        <p>Crescemos ouvindo que precisamos encontrar nossa "metade da laranja". Que somos seres incompletos vagando pela Terra até acharmos aquela peça única de quebra-cabeça que nos fará inteiros. Que bobagem perigosa.</p>
        <p>Dois meios não fazem um inteiro; fazem dois quebrados dependentes. Entrar em um relacionamento esperando que o outro preencha seus vazios, cure seus traumas e te faça feliz é a receita perfeita para o desastre.</p>
        <p>Amor adulto é o encontro de dois inteiros. É transbordar, não completar. Enquanto você buscar no outro a cura para sua própria solidão, continuará escolhendo parceiros errados pelos motivos errados.</p>
      `,
      targetAudience: "Pessoas frustradas com expectativas românticas irreais.",
      editorialReview: {
        stars: 5,
        text: "Avaliação Editorial: Uma desconstrução necessária de mitos que carregamos há gerações. Um convite à maturidade emocional."
      },
      testimonials: [
        { name: "Sérgio L.", role: "Comprador de eBook", text: "Finalmente entendi por que meus relacionamentos nunca duravam. Minhas expectativas eram irreais.", stars: 5 }
      ],
      buyLink: "https://kiwify.com.br/exemplo4"
    },
    {
      id: 5,
      slug: "limites-no-amor",
      title: "Limites no Amor",
      author: "Ricardo Fontes",
      category: "Comunicação",
      cover: "https://placehold.co/400x600/1F1F1F/C5A059?text=Limites+no+Amor",
      price: "R$ 39,00",
      description: "Dizer 'sim' para o outro não pode significar dizer 'não' para si mesmo. Um guia sobre como estabelecer limites saudáveis sem culpa, fortalecendo o respeito mútuo e a admiração.",
      excerpt: `
        <p>Muitos de nós fomos ensinados que amar é ceder. Que o "bom" parceiro é aquele que nunca reclama, que sempre acomoda, que se molda para caber na vida do outro. Chamamos isso de bondade, mas o nome real é anulação.</p>
        <p>Um relacionamento sem limites é um terreno fértil para o ressentimento. Cada vez que você diz "sim" querendo dizer "não", uma pequena gota de raiva se acumula no seu pote emocional. Um dia, esse pote transborda.</p>
        <p>Colocar limites não é afastar o outro; é mostrar a ele onde você termina e onde ele começa. É ensinar como você deseja ser amado. E acredite: as pessoas respeitam muito mais quem se respeita.</p>
      `,
      targetAudience: "Pessoas que sentem que se perdem dentro dos relacionamentos.",
      editorialReview: {
        stars: 4,
        text: "Avaliação Editorial: Prático e direto. Ajuda a identificar padrões de codependência e como quebrá-los com elegância."
      },
      testimonials: [
        { name: "Beatriz A.", role: "Compradora de eBook", text: "Me ajudou a colocar limites no meu casamento de uma forma que meu marido finalmente entendeu e respeitou.", stars: 5 }
      ],
      buyLink: "https://hotmart.com/exemplo5"
    }
  ]
};