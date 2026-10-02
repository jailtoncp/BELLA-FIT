# Avisos de terceiros

## Demonstrações de exercícios

Os GIFs adaptados do [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) usam pares de imagens correspondentes a exercícios do conjunto, que declara publicação sob [The Unlicense](https://unlicense.org/). Os frames foram redimensionados e combinados em animações curtas; veja `scripts/exercise-gif-from-freedb.py` e os arquivos-fontes de cada exercício para reproduzir as adaptações.

No preview Manus, os arquivos ficam no armazenamento gerenciado do projeto. No GitHub Pages, a build usa cópias locais em `github-pages-assets/`.

As demonstrações são referências visuais e não substituem orientação profissional. Consulte a descrição e siga as regras do edital do TAF, quando aplicável.

## Imagem de capa

A arte `github-pages-assets/bella-fit-training-hero.webp` foi criada para o Bella Fit e é distribuída em formato WebP otimizado para o build público do GitHub Pages.

## Demonstrações TAF

O TAF mantém nove GIFs próprios para suas modalidades. Quatro usam fontes humanas publicadas e verificadas no Wikimedia Commons; cada cartão do app exibe crédito ou ligação para a origem. Os demais cinco são animações originais geradas por IA a partir de folhas de quadros estáticos, com uma personagem humana fictícia; não são fotos ou filmagens de uma pessoa real. Os GIFs sintéticos substituem os esquemas de abdominal remador, tiro curto, isometria na barra, subida em corda e shuttle run. Os GIFs e seus pôsteres estão em `github-pages-assets/taf/`.

- **Corrida de 12 minutos:** [Running.gif](https://commons.wikimedia.org/wiki/File:Running.gif), Fengalon, domínio público conforme a página do arquivo.
- **Barra fixa:** [Pullup.gif](https://commons.wikimedia.org/wiki/File:Pullup.gif), Extremistpullup, CC BY-SA 3.0.
- **Salto horizontal:** [Descriptive Zoopraxography Athlete, Standing Long Jump Animated.gif](https://commons.wikimedia.org/wiki/File:Descriptive_Zoopraxography_Athlete,_Standing_Long_Jump_Animated.gif), sequência histórica de Eadweard Muybridge (1893), domínio público conforme a página do arquivo.
- **Flexão de braços:** [Navy seal buds training push-ups](https://commons.wikimedia.org/wiki/File:Navy-seal-buds-training-push-ups.ogv), United States Navy SEALs, obra oficial da Marinha dos EUA indicada como domínio público nos Estados Unidos. A adaptação é um ciclo curto sem áudio; a indicação dos EUA não determina por si só o estado de direitos em toda jurisdição.

Os GIFs sintéticos das cinco outras modalidades foram criados para o Bella Fit a partir de quadros estáticos gerados para esta finalidade e convertidos por `scripts/exercise-gif-from-sheet.py`. Seus arquivos se identificam com o sufixo `-human`; são demonstrações humanas ilustrativas geradas por IA, não material de uma pessoa real.

## GIFs humanos gerados por IA na biblioteca

`levantamento-terra.gif`, `flexao.gif` e `step-up.gif` substituem as demonstrações esquemáticas ou não humanas anteriores por animações originais de aparência humana, geradas a partir de folhas de quatro poses. `burpee.gif`, `pular-corda.gif` e `corrida-estacionaria.gif` são novas demonstrações para o grupo Cardio. Todos mostram a mesma personagem fictícia, têm seis quadros, foram reduzidos para 320 × 180 px e otimizados para menos de 1 MB. São ilustrações realistas geradas por IA, não fotos ou filmagens de pessoas reais. As folhas de geração são insumos temporários do ambiente; o conversor reproduzível está em `scripts/exercise-gif-from-sheet.py` e os GIFs entregues ficam em `github-pages-assets/`.

## Outras demonstrações com origem licenciada

- **Barra fixa na biblioteca:** [Pullup.gif](https://commons.wikimedia.org/wiki/File:Pullup.gif), autor Extremistpullup, CC BY-SA 3.0 / GFDL 1.2+.
- **Polichinelo:** [Jumpingjacks.gif](https://commons.wikimedia.org/wiki/File:Jumpingjacks.gif), autor Wensceslao, CC BY-SA 4.0.
- **Agachamento frontal:** [Zecher-squats-2.gif](https://commons.wikimedia.org/wiki/File:Zecher-squats-2.gif), autor Everkinetic, CC BY-SA 3.0; referência visual de uma variação de agachamento frontal.
- **Abdominal/sit-up:** [Situps.gif](https://commons.wikimedia.org/wiki/File:Situps.gif); consulte a página do arquivo para autor e licença.
- **Agachamento unilateral:** [One-leg-squat-1.gif](https://commons.wikimedia.org/wiki/File:One-leg-squat-1.gif), autor Everkinetic, CC BY-SA 3.0.

O GIF `bird-dog.gif` alterna três posições bilaterais fotografadas por PTPioneer. As fotos originais foram publicadas no Wikimedia Commons sob [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): [Bird dog exercise](https://commons.wikimedia.org/wiki/File:Bird_dog_exercise.jpg), [Bird dog yoga pose](https://commons.wikimedia.org/wiki/File:Girl_doing_bird_dog_yoga_pose.jpg) e [Bird dog yoga pose 2](https://commons.wikimedia.org/wiki/File:Girl_doing_bird_dog_yoga_pose_2.jpg). O Bella Fit redimensiona e combina as fotos num GIF leve; a animação alterna poses estáticas e não é um vídeo nem uma captura contínua de movimento.
