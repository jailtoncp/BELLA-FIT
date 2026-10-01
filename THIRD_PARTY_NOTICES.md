# Avisos de terceiros

## Demonstrações de exercícios

Os 53 GIFs em `github-pages-assets/exercises/` foram produzidos a partir dos pares de imagens correspondentes a exercícios do [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), conjunto que declara publicação sob a licença [The Unlicense](https://unlicense.org/). Os frames originais foram redimensionados e combinados em GIFs curtos. Os nomes e textos da interface em português são conteúdo do Bella Fit.

No preview Manus, os arquivos equivalentes continuam sendo servidos pelo armazenamento gerenciado do WebDev. No GitHub Pages, a build usa os GIFs locais incluídos neste repositório.

O dataset é informativo e as demonstrações não substituem orientação profissional. Consulte o repositório de origem para detalhes de proveniência.

## Imagem de capa

A arte `github-pages-assets/bella-fit-training-hero.webp` foi criada para o Bella Fit e é distribuída em formato WebP otimizado para o build público do GitHub Pages.

## Demonstrações TAF de pessoas reais

Além dos GIFs esquemáticos originais, estas duas modalidades usam versões otimizadas de demonstrações humanas verificadas no Wikimedia Commons. Cada demonstração exibe um link para sua página de origem no app.

- **Salto horizontal parado:** Eadweard Muybridge, *Descriptive Zoopraxography* (1893), sequência histórica de fotografias rotacionada em animação. [Arquivo-fonte e metadados](https://commons.wikimedia.org/wiki/File:Descriptive_Zoopraxography_Athlete,_Standing_Long_Jump_Animated.gif). Commons indica domínio público (PD Gutenberg/PD-Mark; domínio público nos Estados Unidos e em países/áreas cujo prazo de proteção seja vida do autor mais 100 anos ou menos). A adaptação `jump-real.gif` foi reduzida para 360 px; o arquivo original tem 1,42 MB.
- **Flexão de braços:** United States Navy SEALs, vídeo da demonstração de técnica de push-up pelo diretor de preparo físico da Naval Special Warfare. [Arquivo-fonte e metadados](https://commons.wikimedia.org/wiki/File:Navy-seal-buds-training-push-ups.ogv). Commons identifica a obra como domínio público nos Estados Unidos (PD-USGov-Military-Navy; trabalho oficial de funcionário da Marinha dos EUA). `push-up-real.gif` reproduz um ciclo curto da demonstração, sem áudio, em 300 px e 7 fps. A classificação de domínio público da fonte dos EUA não resolve necessariamente direitos em toda jurisdição; Bella Fit mantém o link e o crédito da origem visíveis.

Os metadados do Commons registram `AttributionRequired=false` para ambos, mas Bella Fit mantém crédito informativo e links para os autores/fontes. O script `scripts/optimize-taf-human-gifs.sh` reproduz os recortes e as versões leves a partir das URLs de origem. Nenhum candidato sem licença verificável ou incompatível com o movimento do teste foi adotado.

# GIFs de exercícios adicionados

Os GIFs locais abaixo foram obtidos da Wikimedia Commons e redistribuídos conforme as páginas de licença em Creative Commons:

- `levantamento-terra.gif`: [Man Lifting Barbell Deadlift GIF Animation Loop](https://commons.wikimedia.org/wiki/File:Man_Lifting_Barbell_Deadlift_GIF_Animation_Loop.gif), autor VideoPlasty, CC BY-SA 4.0.
- `flexao.gif`: [Man Doing Push Ups GIF Animation Loop](https://commons.wikimedia.org/wiki/File:Man_Doing_Push_Ups_GIF_Animation_Loop.gif), autor VideoPlasty, CC BY-SA 4.0.
- `barra-fixa.gif`: [Pullup.gif](https://commons.wikimedia.org/wiki/File:Pullup.gif), autor Extremistpullup, CC BY-SA 3.0 / GFDL 1.2+.
- `polichinelo.gif`: [Jumpingjacks.gif](https://commons.wikimedia.org/wiki/File:Jumpingjacks.gif), autor Wensceslao, CC BY-SA 4.0.

## Demonstrações externas adicionadas à biblioteca

Estas cinco demonstrações são carregadas diretamente do Wikimedia Commons para exercícios que ainda não tinham mídia no Bella Fit. A aplicação mantém a URL da fonte no código para permitir rastreabilidade e não duplica os arquivos binários no repositório.

- **Agachamento frontal:** [Zecher-squats-2.gif](https://commons.wikimedia.org/wiki/File:Zecher-squats-2.gif), autor Everkinetic, CC BY-SA 3.0. É uma variação de front squat/Zecher squat; serve como referência visual do padrão de agachamento frontal.
- **Step-up:** [Step up — CDC strength training for older adults](https://commons.wikimedia.org/wiki/File:Step_up-CDC_strength_training_for_older_adults.gif), Centers for Disease Control and Prevention, domínio público nos EUA.
- **Flexão:** [Pushups wbs.gif](https://commons.wikimedia.org/wiki/File:Pushups_wbs.gif), autor Wensceslao, CC BY-SA 4.0.
- **Abdominal/sit-up:** [Situps.gif](https://commons.wikimedia.org/wiki/File:Situps.gif), Wikimedia Commons; licença indicada na página do arquivo.
- **Agachamento unilateral:** [One-leg-squat-1.gif](https://commons.wikimedia.org/wiki/File:One-leg-squat-1.gif), autor Everkinetic, CC BY-SA 3.0.

## Demonstrações adicionais de movimentos

Os GIFs `abducao-elastico.gif`, `agachamento-bulgaro.gif`, `agachamento-frontal.gif`, `agachamento-goblet.gif`, `mesa-flexora.gif`, `kickback-elastico.gif`, `glute-bridge-elastico.gif`, `good-morning.gif`, `terra-sumo.gif`, `panturrilha-sentado.gif`, `panturrilha-unilateral.gif`, `pullover-cabo.gif`, `puxada-neutra.gif`, `remada-maquina.gif`, `face-pull.gif`, `supino-maquina.gif` e `flexao-inclinada.gif` são GIFs originais produzidos para o Bella Fit a partir de folhas de quadros geradas por IA. A atleta é uma personagem fictícia com aparência humana realista; os quadros não são fotografia ou filmagem de uma pessoa real. As folhas foram convertidas em GIFs de seis quadros, redimensionados e otimizados para menos de 1 MB por arquivo. O script reproduzível está em `scripts/exercise-gif-from-sheet.py`.
- `step-up.gif`: [Step up—CDC strength training for older adults](https://commons.wikimedia.org/wiki/File:Step_up-CDC_strength_training_for_older_adults.gif), Centers for Disease Control and Prevention (CDC), obra do governo federal dos Estados Unidos em domínio público. O crédito é informativo e não é exigido pela licença; [base de direitos governamentais dos EUA](https://www.usa.gov/government-works).

Os 19 GIFs adicionais (`encolhimento.gif`, `supino-inclinado.gif`, `crucifixo-maquina.gif`, `desenvolvimento-maquina.gif`, `elevacao-lateral-cabo.gif`, `posterior-maquina.gif`, `rosca-scott.gif`, `rosca-cabo.gif`, `triceps-corda.gif`, `triceps-coice.gif`, `mergulho-banco.gif`, `abdominal-cabo.gif`, `abdominal-roda.gif`, `dead-bug.gif`, `mountain-climber.gif`, `caminhada-elastico.gif`, `rosca-elastico.gif`, `prancha-lateral.gif` e `levantamento-lateral-caneleira.gif`) usam pares de imagens com o mesmo nome de exercício no Free Exercise DB. A licença declarada para o conjunto é The Unlicense; as adaptações estão em 320 × 240 px e abaixo de 1 MB. O conversor reproduzível está em `scripts/exercise-gif-from-freedb.py`. A variação “rosca com elástico” usa a demonstração de rosca com barra EZ e faixa elástica.

O GIF `bird-dog.gif` alterna três posições bilaterais fotografadas por PTPioneer. As fotos originais foram publicadas no Wikimedia Commons sob [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): [Bird dog exercise](https://commons.wikimedia.org/wiki/File:Bird_dog_exercise.jpg), [Bird dog yoga pose](https://commons.wikimedia.org/wiki/File:Girl_doing_bird_dog_yoga_pose.jpg) e [Bird dog yoga pose 2](https://commons.wikimedia.org/wiki/File:Girl_doing_bird_dog_yoga_pose_2.jpg). O Bella Fit redimensiona e combina as fotos num GIF leve; a animação alterna poses estáticas e não é um vídeo nem uma captura contínua de movimento.

Os GIFs externos foram escolhidos por apresentarem o movimento em loop e por terem uma página de licença/proveniência verificável. Eles são demonstrações visuais de referência e não substituem orientação profissional.
