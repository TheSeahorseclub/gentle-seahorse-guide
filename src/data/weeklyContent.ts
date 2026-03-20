export interface ContentSection {
  label: string;
  points: string[];
}

export interface WeekContent {
  week: number;
  title: string;
  gentleFocus: string;
  iconName: 'heart' | 'message-circle' | 'hand' | 'moon' | 'sparkles' | 'eye' | 'baby' | 'brain' | 'smile' | 'music' | 'move' | 'sun';
  introduction: string;
  sections: ContentSection[];
  neurodevelopmentalNote: string;
  weeklyCta?: string;
  extraGuidance?: { title: string; points: string[] };
  isStartingPoint?: boolean;
}

export interface MonthContent {
  month: number;
  title: string;
  subtitle: string;
  weeks: WeekContent[];
  closingNote?: string;
}

export const allMonths: MonthContent[] = [
  // ─── MONTH 1 ───
  {
    month: 1,
    title: 'Month 1',
    subtitle: 'Adapting to the world',
    weeks: [
      {
        week: 1,
        title: 'Safety, Sleep, and First Connections',
        gentleFocus: 'Respecting natural rhythms and building early connection',
        iconName: 'heart',
        introduction:
          "During this first week, your baby will be very sleepy and is adapting to life outside the womb. At this stage, the nervous system is still highly immature, and regulation depends almost entirely on the caregiver.\n\nFocus on respecting your baby's natural rhythms. There is no need to overstimulate.",
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              "When interacting, keep your face approximately 30 cm from your baby's face. Their vision is still blurred, and this distance supports visual comfort.",
              'Make eye contact when possible and smile gently.',
              'Speak slowly, calmly, and rhythmically.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'No structured motor activities are required this week. Gentle handling, holding, and skin-to-skin contact are sufficient.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Research in early social neuroscience shows that face-to-face interaction activates early social brain networks, supporting emotional security and future communication.',
        isStartingPoint: true,
      },
      {
        week: 2,
        title: 'The Human Face as the First Toy',
        gentleFocus: 'Facial expression and melodic interaction',
        iconName: 'message-circle',
        introduction:
          'Your baby\'s favourite "toy" is your face. This week is about playful, gentle interaction through expression and voice.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Raise your eyebrows, open and close your mouth, show your tongue, blink slowly.',
              'Speak using a slightly exaggerated, melodic tone (often called "parentese").',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Studies show that babies are biologically primed to respond to facial expressions and rhythmic speech, which supports early language and social development.',
      },
      {
        week: 3,
        title: 'Patterns, Voice, and Familiarity',
        gentleFocus: 'Repetition, language exposure, and early motor exploration',
        iconName: 'hand',
        introduction:
          'Your baby is beginning to notice patterns in sound and interaction. Familiar voices and consistent words help build a sense of safety.',
        sections: [
          {
            label: 'Cognitive & Language Development',
            points: [
              'Choose a small group of simple words and repeat them consistently throughout the week.',
              'Read aloud stories you used during pregnancy — familiarity supports neural recognition and emotional safety.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Introduce tummy time for short periods, always supervised.',
              "Place your baby on their tummy to encourage head lifting and upper-body strength.",
            ],
          },
        ],
        neurodevelopmentalNote:
          'Neuroscience research shows that repetition strengthens neural pathways, especially in early language networks.',
      },
      {
        week: 4,
        title: 'Hands, Discovery, and First Rituals',
        gentleFocus: 'Hand discovery, early grasping, and predictable routines',
        iconName: 'moon',
        introduction:
          "This is a period of hand discovery. Your baby is also ready for the gentle introduction of bedtime rituals that support their developing nervous system.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Offer rattles or soft objects that can safely be brought to the mouth — always prefer items that are petrol-free.',
              'Encourage reaching and grasping movements.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Continue facial games and allow pauses so your baby can respond.',
              'Begin introducing a simple baby bedtime story routine.',
            ],
          },
          {
            label: 'Extra Guidance – Sleep Ritual',
            points: [
              'Bath at the same time.',
              'Gentle massage (hands and feet).',
              'Dim lights.',
              'Calm voice or soft music.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Consistent rituals help regulate stress hormones and support sleep-wake cycles, according to infant sleep research.',
      },
    ],
  },

  // ─── MONTH 2 ───
  {
    month: 2,
    title: 'Month 2',
    subtitle: 'Sensory integration and emotional bonding',
    weeks: [
      {
        week: 1,
        title: 'Touch and Body Awareness',
        gentleFocus: 'Tactile exploration and the transition to intentional holding',
        iconName: 'hand',
        introduction:
          'Touch is the first sense to develop in the womb and remains central now.',
        sections: [
          {
            label: 'Tactile Development',
            points: [
              'Encourage play with different textures using hands and feet.',
              'Use soft fabrics, crochet items, or organic natural materials.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This supports the transition from involuntary grasping to intentional holding, a key sensorimotor milestone.',
      },
      {
        week: 2,
        title: 'Vision, Voice, and Emotional Safety',
        gentleFocus: 'Visual tracking, affirming language, and emotional tone',
        iconName: 'eye',
        introduction:
          "Your baby's visual attention is growing. This week focuses on tracking, voice, and emotional safety.",
        sections: [
          {
            label: 'Attention Test',
            points: [
              "Move a handheld toy slowly from side to side at around 30 cm from your baby's face.",
              'Observe whether your baby follows the movement with their eyes.',
              "If the baby doesn't follow it — let your doctor know at the next consultation.",
              'The expected attention span at this stage is around 30 seconds.',
            ],
          },
          {
            label: 'Emotional Development',
            points: [
              'Use positive, affirming language.',
              'Speak as if your baby understands emotional meaning.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Attachment research consistently shows that emotional tone matters more than words in early development.',
      },
      {
        week: 3,
        title: 'Cause, Effect, and Curiosity',
        gentleFocus: 'Early cognitive connections and continued motor strengthening',
        iconName: 'brain',
        introduction:
          'Your baby is beginning to notice that actions lead to outcomes.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Use toys that make sounds when moved.',
              'Allow your baby to explore safely with their mouth and hands.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Continue tummy time to strengthen muscles needed for sitting and crawling.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Cause-and-effect understanding is one of the earliest forms of logical thinking and supports future problem-solving skills.',
      },
      {
        week: 4,
        title: 'Autonomy and Gentle Exploration',
        gentleFocus: 'Independent play, early memory, and body awareness',
        iconName: 'sparkles',
        introduction:
          'This week gently introduces brief moments of independence, always with you nearby.',
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              'Allow brief moments of independent play, with you nearby.',
              'This supports early autonomy and confidence.',
            ],
          },
          {
            label: 'Extra Activity',
            points: [
              'Play simple games like covering your face and revealing it again. This supports early memory and body awareness.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Brief, supported independence helps build early self-regulation and a secure base for exploration.',
      },
    ],
  },

  // ─── MONTH 3 ───
  {
    month: 3,
    title: 'Month 3',
    subtitle: 'Movement, communication, and social interest',
    weeks: [
      {
        week: 1,
        title: 'Integration and Expression',
        gentleFocus: 'Alertness, curiosity, and social engagement',
        iconName: 'smile',
        introduction:
          'Your baby is now more alert, curious, and socially engaged.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Offer soft books with simple images.',
              'Continue using repeated words to strengthen phonetic recognition.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Your baby may begin rolling or preparing to roll.',
              'Encourage free movement on the floor in a safe environment.',
            ],
          },
          {
            label: 'Social & Emotional Development',
            points: [
              'Talk to your baby about what they see, hear, and perhaps feel — like fear, happiness, cold, or hot.',
              'Name emotions gently, even if they are only beginning to be perceived.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Research in affective neuroscience highlights that naming experiences supports emotional regulation later in life.',
      },
    ],
    closingNote:
      'This weekly structure will continue throughout the app, gradually increasing complexity while always respecting each child\'s unique developmental rhythm.\n\nRemember: development happens in waves, not straight lines. Variation is not only normal — it is expected.',
  },

  // ─── MONTH 4 ───
  {
    month: 4,
    title: 'Month 4',
    subtitle: 'Discovery and strengthening connections',
    weeks: [
      {
        week: 1,
        title: 'Rolling Foundations and Core Strength',
        gentleFocus: 'Floor-based movement and early problem-solving',
        iconName: 'move',
        introduction:
          'Around this stage, many babies begin attempting to roll from tummy to back.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Increase supervised tummy time.',
              'Place a toy slightly to the side to encourage weight shifting.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Allow your baby to reach, miss, and try again.',
              'Avoid placing objects directly into their hands every time.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Repeated floor-based movement strengthens the deep trunk muscles necessary for later sitting and crawling. Trial-and-error supports early problem-solving circuits.',
        weeklyCta:
          'This week, create a safe floor space and allow at least two short daily sessions of free movement exploration.',
        extraGuidance: {
          title: 'Environmental Care',
          points: [
            'Choose organic cotton clothing rather than synthetic fabrics when possible. Natural fibres reduce skin irritation and limit exposure to microplastics.',
            'Wash new clothes before first use using gentle, fragrance-free detergents.',
          ],
        },
      },
      {
        week: 2,
        title: 'Laughter, Voice, and Social Brain Activation',
        gentleFocus: 'Turn-taking, vocal exchange, and undivided attention',
        iconName: 'smile',
        introduction:
          'Your baby may now laugh aloud and actively seek interaction.',
        sections: [
          {
            label: 'Social & Emotional Development',
            points: [
              'Play turn-taking games (you smile, pause, baby responds).',
              "Imitate your baby's sounds.",
            ],
          },
        ],
        neurodevelopmentalNote:
          "Studies in social neuroscience (e.g. Trevarthen's work on \"proto-conversation\") show that back-and-forth vocal exchanges strengthen early communication networks.",
        weeklyCta:
          'Schedule five to ten minutes of uninterrupted face-to-face play daily — no phones, no distractions, no screens.',
      },
      {
        week: 3,
        title: 'Visual Tracking and Hand Coordination',
        gentleFocus: 'Cross-body movement and texture exploration',
        iconName: 'hand',
        introduction:
          "Your baby is developing bilateral coordination — using both sides of the body together.",
        sections: [
          {
            label: 'Motor & Visual Integration',
            points: [
              'Encourage reaching across the midline (from one side of the body to the other).',
              'Offer lightweight objects that require two hands.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Cross-body movement supports bilateral integration — coordination between the two brain hemispheres.',
        weeklyCta:
          'Introduce one new safe texture this week — wood, silicone, natural fabric — and observe how your baby explores it.',
      },
      {
        week: 4,
        title: 'Sleep Rhythms and Regulation',
        gentleFocus: 'Circadian rhythms, consistency, and early self-efficacy',
        iconName: 'moon',
        introduction:
          "Circadian rhythms (the body's internal clock) are becoming more established.",
        sections: [
          {
            label: 'Nervous System Development',
            points: [
              'Maintain consistent bedtime cues.',
              'Dim lights at least 30 minutes before sleep.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Infant sleep research indicates that predictable routines help regulate cortisol (a stress hormone) and melatonin production. Short independent play moments support early self-efficacy.',
        weeklyCta:
          'Refine your evening ritual and keep it consistent for seven consecutive nights. Allow 30% of play time for supervised independent exploration daily.',
        extraGuidance: {
          title: 'Maternal Nutrition (If Breastfeeding)',
          points: [
            'Prioritise organic foods where possible to reduce exposure to pesticides.',
            'Choose whole, minimally processed meals.',
            'Some families prefer to reduce gluten intake to support sensitivity; always consult your health professional for more significant dietary changes.',
          ],
        },
      },
    ],
  },

  // ─── MONTH 5 ───
  {
    month: 5,
    title: 'Month 5',
    subtitle: 'Stability, curiosity, and early communication',
    weeks: [
      {
        week: 1,
        title: 'Supported Sitting and Trunk Control',
        gentleFocus: 'Floor-based practice and reducing restrictive devices',
        iconName: 'move',
        introduction:
          'Many babies begin practising supported sitting around this stage.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Sit your baby on the floor between your legs for support.',
              'Avoid prolonged time in restrictive devices.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Floor-based movement remains the gold standard for motor development according to paediatric physiotherapy research.',
        weeklyCta:
          'Replace one container-based activity (bouncer, seat) with supervised floor time.',
      },
      {
        week: 2,
        title: 'Babbling and Sound Play',
        gentleFocus: 'Phonemic mapping and consistent word repetition',
        iconName: 'music',
        introduction:
          'Babbling becomes more varied ("ba", "da", "ma").',
        sections: [
          {
            label: 'Language Development',
            points: [
              "Repeat the sounds your baby makes.",
              'Expand slightly (baby says "ba", you say "ball").',
            ],
          },
        ],
        neurodevelopmentalNote:
          "Repetition strengthens phonemic mapping — the brain's ability to distinguish speech sounds.",
        weeklyCta:
          'Choose three simple words and repeat them consistently throughout daily routines.',
      },
      {
        week: 3,
        title: 'Object Exploration and Early Memory',
        gentleFocus: 'Object permanence and memory building',
        iconName: 'brain',
        introduction:
          'Your baby is beginning to understand that objects continue to exist even when partially hidden — an early form of object permanence.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Partially hide a favourite toy under a cloth and allow your baby to search for it.',
            ],
          },
        ],
        neurodevelopmentalNote:
          "Developmental psychology research (Piaget's early sensorimotor stages) highlights this as a foundation for memory building.",
        weeklyCta: 'Play one short hiding-and-finding game each day.',
      },
      {
        week: 4,
        title: 'Emotional Referencing',
        gentleFocus: 'Social referencing and modelling calm curiosity',
        iconName: 'heart',
        introduction:
          'Your baby now looks to you to understand whether something is safe.',
        sections: [
          {
            label: 'Social Development',
            points: [
              'If a new sound occurs, respond calmly and reassuringly.',
              'Use facial expressions intentionally.',
            ],
          },
        ],
        neurodevelopmentalNote:
          "This is known as social referencing — babies read caregivers' faces to regulate their own emotional responses.",
        weeklyCta:
          'Become aware of your facial expressions during new experiences and model calm curiosity.',
      },
    ],
  },

  // ─── MONTH 6 ───
  {
    month: 6,
    title: 'Month 6',
    subtitle: 'Mobility, solids, and expanding awareness',
    weeks: [
      {
        week: 1,
        title: 'Preparing for Crawling',
        gentleFocus: 'Shoulder stability, spatial awareness, and safe exploration',
        iconName: 'move',
        introduction:
          'Your baby may rock on hands and knees or pivot in circles.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Encourage reaching slightly beyond comfortable distance.',
              'Continue daily tummy time.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Crawling preparation strengthens shoulder stability and spatial awareness.',
        weeklyCta:
          'Create a safe exploration zone on the floor free from hazards.',
      },
      {
        week: 2,
        title: 'Introduction to Solid Foods',
        gentleFocus: 'Developmental readiness, organic ingredients, and patient observation',
        iconName: 'sun',
        introduction:
          'Signs of readiness may include sitting with support and showing interest in food.',
        sections: [
          {
            label: 'Feeding Guidance',
            points: [
              'Introduce single-organic ingredient foods gradually.',
              'Observe for tolerance and comfort.',
              "We recommend exclusive breastfeeding for around six months or longer, while also encouraging you to listen to your body and your baby's needs. After this period, you can begin introducing complementary foods gradually, while continuing milk feeds for as long as it feels right for both of you.",
            ],
          },
        ],
        neurodevelopmentalNote:
          'Gradual, responsive introduction to solids supports both nutritional needs and the developing sensory system.',
        weeklyCta:
          "Introduce one new whole food and observe your baby's response calmly and patiently.",
        extraGuidance: {
          title: 'Food Quality',
          points: [
            'Prefer organic farmers when possible to reduce pesticide exposure.',
            'Avoid highly processed foods.',
            'Introduce natural flavours without added sugar or salt.',
          ],
        },
      },
      {
        week: 3,
        title: 'Fine Motor Precision',
        gentleFocus: 'Grasp refinement and hand-to-hand transfer',
        iconName: 'hand',
        introduction:
          'Your baby begins refining grasp patterns.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Offer safe finger foods (if ready) or graspable objects.',
              'Encourage transferring objects between hands.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This supports the development of the pincer grasp (thumb-to-finger coordination), essential for later writing skills.',
        weeklyCta:
          'Allow supervised self-feeding exploration at least once per day if appropriate.',
      },
      {
        week: 4,
        title: 'Social Expansion and Emotional Labelling',
        gentleFocus: 'Naming emotions and calm reassurance during new interactions',
        iconName: 'heart',
        introduction:
          'Your baby is increasingly aware of social differences between familiar and unfamiliar people.',
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              'Name emotions gently ("You look surprised", "That was loud", "It\'s normal to feel like this").',
              'Maintain consistent, calm reassurance during new interactions.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Affective neuroscience research suggests that early emotional labelling supports long-term emotional regulation.',
        weeklyCta:
          'This week, consciously name at least one emotional state during daily interactions.',
      },
    ],
    closingNote:
      "As your baby grows, this content will continue to expand month by month, always respecting each child's individual rhythm and neurodevelopmental uniqueness.",
  },

  // ─── MONTH 7 ───
  {
    month: 7,
    title: 'Month 7',
    subtitle: 'Movement with intention',
    weeks: [
      {
        week: 1,
        title: 'Independent Sitting Stability',
        gentleFocus: 'Building postural control through seated exploration',
        iconName: 'move',
        introduction:
          "Fine motor coordination is improving in the 7-month-old baby: some can already hold an object with their little hands, they probably pass things from one hand to the other easily and may even be able to hold a special children's cup with both hands together (and with your help).\n\nIt is at this stage that many children begin to test the authority of their parents.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'At this stage, the baby can support weight on their legs for short periods and loves to jump.',
              'Follow the instructions in the e-book developed by the physiotherapist and sent by email.',
              'Many babies can now sit independently for short periods.',
              'Encourage reaching while seated.',
              'Place toys slightly outside immediate reach to stimulate balance adjustments.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'In this cycle, the baby is already able to spell two-syllable words, repeating the initial syllable: mama, da-da, etc.',
              'Then, they will start using expressions like "ai" or "ui" and soon will be able to intentionally shout to get attention.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This strengthens "postural control" — the nervous system\'s ability to maintain body alignment against gravity. Research in paediatric motor control shows that dynamic sitting improves trunk activation patterns necessary for crawling.',
        weeklyCta:
          'Create one safe sitting exploration session daily where your baby can freely reach and rebalance.',
      },
      {
        week: 2,
        title: 'Early Crawling Attempts',
        gentleFocus: 'Supporting cross-lateral integration through floor-based play',
        iconName: 'move',
        introduction:
          'Your baby may begin rocking on hands and knees or moving backwards. This is an exciting stage of motor and brain integration.',
        sections: [
          {
            label: 'Motor & Brain Integration',
            points: [
              'Your baby may begin rocking on hands and knees or moving backwards.',
              'Crawling stimulates "cross-lateral integration" — communication between left and right brain hemispheres via the corpus callosum.',
            ],
          },
          {
            label: 'Cognitive and Motor Development',
            points: [
              'Activity: Grouping blocks — The baby is beginning to understand the relationship of one object to another in a three-dimensional space.',
              'With this skill, they begin to observe the toys and are able to group blocks by size.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Studies in developmental neuroscience associate crawling with later spatial awareness and reading readiness.',
        weeklyCta:
          'Increase floor-based play throughout the day.',
      },
      {
        week: 3,
        title: 'Advanced Babbling',
        gentleFocus: 'Encouraging rhythmic vocal play and persistence',
        iconName: 'message-circle',
        introduction:
          'Babbling becomes more complex and rhythmic. This stage reflects "canonical babbling" — repeated consonant-vowel combinations (e.g., "bababa"). Research shows this predicts later expressive language development.',
        sections: [
          {
            label: 'Language Development',
            points: [
              'Repeat and expand sounds your baby makes.',
              'Maintain eye contact during vocal play.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'To help with the development of fine motor coordination, place a toy that the baby likes the most or something interesting out of reach and observe how they try to grab it.',
              'If they can\'t reach it, they may cry, but perseverance and frustration go hand in hand — calmly encourage them without handing over the object.',
              'After a few attempts, the baby will lean over and then return to the initial position, building physical confidence.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Continue using the list of primary words and the conscious repetition of some expressions to increase the quality of linguistic perception.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Canonical babbling is a key milestone in speech development. Responsive vocal interaction strengthens the neural pathways that support future language.',
        weeklyCta:
          'Have one uninterrupted "conversation" daily where you respond to every vocal attempt.',
      },
      {
        week: 4,
        title: 'Stranger Awareness',
        gentleFocus: 'Calm reassurance during new social experiences',
        iconName: 'heart',
        introduction:
          'Your baby may show hesitation around unfamiliar people. This reflects maturation of the "amygdala" — the brain region involved in threat detection — and attachment circuitry.',
        sections: [
          {
            label: 'Emotional Development',
            points: [
              'Offer reassurance without forcing interaction.',
              'Stay physically present during new experiences.',
              'Model calm reassurance when introducing new people.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Stranger awareness is a healthy sign of attachment and cognitive development. The amygdala is maturing, helping your baby distinguish between familiar and unfamiliar faces.',
        weeklyCta:
          'Model calm reassurance when introducing new people this week.',
        extraGuidance: {
          title: 'Extra tips for Month 7',
          points: [
            'At 7 months, the baby is already eating solids; however, be patient if they don\'t eat as much as you expect or everything you offer.',
            'The baby should sleep, on average, 14 hours a day. Normally, they also divide this sleep between nighttime sleep and two daytime naps.',
            'It\'s important to remember that the learning rhythm is not continuous, proceeding through leaps and setbacks — this is due to synaptic pruning or lack of consolidation of learning. Forgetting previous acquisitions is considered normal.',
          ],
        },
      },
    ],
    closingNote:
      'Month 7 brings wonderful movement milestones. Every baby finds their own rhythm — trust the process and enjoy the adventure together.',
  },

  // ─── MONTH 8 ───
  {
    month: 8,
    title: 'Month 8',
    subtitle: 'Exploration and cause–effect learning',
    weeks: [
      {
        week: 1,
        title: 'Intentional Movement',
        gentleFocus: 'Safe exploration and early memory development',
        iconName: 'move',
        introduction:
          "A new world of adventures is about to open up for your baby, so now, more than ever, it's time to make sure your home is a safe environment. Babies as young as 8 months old can already crawl.\n\nIt's important that you make sure that fragile objects and furniture that could put the child at risk are positioned out of their reach and radar.",
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'They already know that an object exists even when they don\'t see it, and when they see an object disappear, they look for it.',
              'Memory begins to show its signs of development, and memory is the most interesting ability developing right now.',
            ],
          },
          {
            label: 'Suggested Activity',
            points: [
              'Play games focused on hiding and finding — for example, put their favourite toy behind your back and ask "where is it?"',
              'Make variations of this memory-focused game throughout the week.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Object permanence is becoming well established. The ability to hold an image in mind when the object is out of sight reflects important memory and prefrontal cortex development.',
        weeklyCta:
          'Play one hiding-and-finding game each day to support memory development.',
      },
      {
        week: 2,
        title: 'Object Permanence Expands',
        gentleFocus: 'Supporting independence and managing separation feelings',
        iconName: 'brain',
        introduction:
          'Your baby is becoming more physically capable and emotionally expressive. This is a wonderful — and sometimes challenging — time for both of you.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              '8-month-old babies can already: stand up by supporting themselves on objects, pick up toys when they fall on the floor, and open cupboards and drawers to get what\'s inside.',
              'Proposal: Leave an object at a distance of 1 metre and ask the baby to fetch it.',
              'Suggestion: Assemble a sensory bottle to diversify the stimuli — take an empty water bottle, put grains in it, cap it, and give it to the baby; they will love it.',
            ],
          },
          {
            label: 'Emotional & Affective Development',
            points: [
              'An 8-month-old baby is quite emotional, misses their parents, doesn\'t like being alone and always seeks to be held by someone.',
              'At this stage, separation anxiety can be very strong, so they want to stay closer.',
              'When you need to go out and leave your baby with someone they know — whether it\'s their father, caregiver or grandparents — talk to the baby and say you\'ll be back soon. If they start to cry, gently reassure them and go.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Separation anxiety is a normal and healthy part of attachment development. It shows your baby has formed a strong bond and is beginning to understand that you are a separate person.',
        weeklyCta:
          'Create one sensory exploration activity this week using safe household items.',
      },
      {
        week: 3,
        title: 'Fine Motor Precision',
        gentleFocus: 'Exploring textures, shapes, and early vocabulary',
        iconName: 'hand',
        introduction:
          'Your baby\'s fine motor skills are developing rapidly, and their understanding of language is growing alongside.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Perceives the meaning of some words, and repeats vowels and sounds forming "pa pa" and "ma ma".',
              'Continue using the list of primary words from the primer to expand this vocabulary.',
              'Imitate animal sounds, car engines, etc. — they will love it.',
            ],
          },
          {
            label: 'Sensory & Motor Development',
            points: [
              'Treasure Box: Take a box, put all the small toys that your baby is fond of and a couple of new textures like a small food package, and place them inside.',
              'The treasure box allows them to get to know new objects that are part of the familiar environment. Through touch, they recognise new shapes and textures.',
              'Put a label on these toys with their respective names, and when the baby takes out the toy, read its name to them.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Pairing tactile exploration with naming supports multi-sensory learning — connecting touch, vision, and language pathways in the developing brain.',
        weeklyCta:
          'Create a treasure box this week and explore it together, naming each item.',
      },
      {
        week: 4,
        title: 'Balance and Sensory Play',
        gentleFocus: 'Stimulating balance and multi-sensory curiosity',
        iconName: 'sparkles',
        introduction:
          'This week focuses on balance development and rich sensory experiences that spark curiosity and joy.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Look for games that stimulate the sense of balance.',
              'Continue encouraging the baby to reach for objects — on a safe surface, place toys away from them so that they try to reach them.',
            ],
          },
          {
            label: 'Sensory & Motor Development',
            points: [
              'Place raw foods such as beans, rice, and pasta inside a box for sensory exploration.',
              'Variation: Inside a tray or small container, place liquid foods, gelatin, ice in a bag or protected by cling film, flour — use your creativity and let your baby\'s curiosity run the game. Give them time alone to experiment the first time.',
              'The second time you make this activity, name the processes and tell them the name of each thing, such as "look at this baby, a soft, purple gelatin."',
              'Brush flour or gelatin on their face — have fun together!',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Multi-sensory play strengthens neural connections across the brain. When babies explore different textures, temperatures, and consistencies, they build a richer understanding of the physical world.',
        weeklyCta:
          'Set up one sensory tray experience this week and let your baby explore freely.',
      },
    ],
    closingNote:
      'Month 8 is a time of wonderful exploration. Your baby is becoming more intentional in their movements and increasingly curious about the world. Continue to provide a safe, stimulating environment and enjoy this beautiful stage together.',
  },
  // ─── MONTH 9 ───
  {
    month: 9,
    title: 'Month 9',
    subtitle: 'Mobility and memory',
    weeks: [
      {
        week: 1,
        title: 'First Steps and Nature Connection',
        gentleFocus: 'Supporting early walking and enriching sensory experiences through nature',
        iconName: 'move',
        introduction:
          "The baby is closer to walking or is actually already walking. At this stage, they can usually climb stairs by crawling and move around standing up while holding onto furniture. The baby is also learning to bend their knees and sit up after already standing — an operation that is more difficult than you might imagine! Don't let them sit in a W position.\n\nOne way to help your baby with these first walks is to position yourself in front of them, a short distance away, with your hands outstretched touching their back, calling them to walk towards you.",
        sections: [
          {
            label: 'Sensory Development',
            points: [
              'Naturalize nature — step on the earth or grass, sunbathe, bathe in the sea, feel the wind, listen to birdsong, the barking of other animals, or hear other people\'s voices.',
              'There is no doubt that nature is always the richest environment for sensory experiences.',
              'Take this week to organize more outdoor play and walks.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Walking requires the coordination of multiple brain systems simultaneously — balance, proprioception, motor planning, and spatial awareness. Each wobbly step is a remarkable feat of neural integration.',
        weeklyCta:
          'Create safe obstacle courses for your baby to navigate.',
      },
      {
        week: 2,
        title: 'Joint Attention',
        gentleFocus: 'Building shared focus between caregiver and child',
        iconName: 'eye',
        introduction:
          "Your baby may follow your gaze or pointing. \"Joint attention\" (shared focus between caregiver and child) predicts language development outcomes.\n\nAt 9 months, children like to give a toy to someone else just to take it back later. Join in the fun and take the opportunity to introduce the word \"thank you!\".\n\nYour tone of voice still makes more sense to your child than the words themselves. But, the more you talk to them — while preparing dinner, in the car or while getting dressed — the more the baby learns about the dynamics of communication.",
        sections: [
          {
            label: 'Sensory Development',
            points: [
              'Activity with fabrics: Take several cloth toys that you may have at home and some scraps of various fabrics, a small towel, different cloth materials and set up an experimentation circle around your baby.',
              'Let them experiment with the different textures freely.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Joint attention is one of the strongest early predictors of language development. When you and your baby share focus on the same object, you are building the neural foundations for communication and social understanding.',
        weeklyCta:
          'Point and name objects during daily routines.',
      },
      {
        week: 3,
        title: 'Early Problem Solving',
        gentleFocus: 'Supporting cause-and-effect learning through safe repetition',
        iconName: 'brain',
        introduction:
          "Babies experiment with dropping objects repeatedly. This supports understanding of \"cause and effect\" through repetition-driven neural strengthening.\n\nAt this stage, the baby begins to point to what they want, clap their hands, wave goodbye, imitate facial expressions, gestures, and some sounds. Enjoy this delightful and important phase by playing with imitations, playful conversations, music, and theatrical readings.",
        sections: [
          {
            label: 'Spatial Cognitive Development',
            points: [
              'Perception of movement through toys. Provide the baby with strollers and toys that generate this perception of movement, regardless of the baby\'s sex — remembering that toys have no gender.',
            ],
          },
          {
            label: 'Reading & Language',
            points: [
              'Continue reading for your baby; at this stage, it would be good to revisit reading material from your pregnancy or the baby\'s first trimester.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Repetitive dropping is not misbehaviour — it is your baby\'s way of testing how the physical world works. Each drop strengthens neural pathways related to cause and effect, gravity, and prediction.',
        weeklyCta:
          'Allow safe repetition rather than interrupting exploratory dropping.',
      },
      {
        week: 4,
        title: 'Sleep Separation Sensitivity',
        gentleFocus: 'Maintaining predictable routines and exploring sensory play',
        iconName: 'moon',
        introduction:
          "Sleep disruptions may reappear due to mobility and attachment shifts. Consistent routines regulate cortisol and support emotional safety.",
        sections: [
          {
            label: 'Sensory/Visual Development',
            points: [
              'Take our non-toxic primary and secondary color kit, set up a space (it could be with a towel on the floor and some clothes that they can "dirty"), and let the baby experiment.',
            ],
          },
          {
            label: 'Emotional Development',
            points: [
              'At 9 months, babies are able to perceive emotions by observing the faces of animals and people.',
            ],
          },
          {
            label: 'Auditory/Cognitive Development',
            points: [
              'The baby begins to play more with their own voice and acquires the ability to repeat sounds.',
              'When you hear them trying to speak, repeat their "words" as a gesture of encouragement.',
              'Suggestion: Play a playlist of songs focused on repeating words and vowels for the baby to listen to and perhaps repeat.',
            ],
          },
          {
            label: 'Communication & Body Awareness',
            points: [
              'In your conversations with your baby, include varied gestures and facial expressions, and use rhythmic and sound variations (for example, speaking louder and then very softly).',
              'Name body parts and the baby\'s name, and play games like "Simon Says," adapting the actions to your reality.',
              'This strengthens the emotional bond between the baby and their caregiver and promotes the development of body awareness and language in a fun way.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Sleep regressions at this age often coincide with major motor and cognitive leaps. The brain is so busy integrating new skills that settling can be harder. Predictable bedtime rituals signal safety to the developing nervous system.',
        weeklyCta:
          'Maintain predictable bedtime rituals.',
        extraGuidance: {
          title: 'Extra tips for this period',
          points: [
            'Avoid putting shoes on babies unless absolutely necessary. Shoes aren\'t needed until your child is frequently walking outside.',
            'Walking barefoot not only strengthens the instep and the muscles of the baby\'s feet and legs, preventing flat feet, but also helps with balance.',
          ],
        },
      },
    ],
    closingNote:
      'Month 9 is a time of wonderful mobility and growing memory. Your baby is becoming more intentional in their movements and communication. Continue to provide a safe, stimulating environment and enjoy this beautiful stage of discovery together.',
  },
  // ─── MONTH 10 ───
  {
    month: 10,
    title: 'Month 10',
    subtitle: 'Mobility and memory',
    weeks: [
      {
        week: 1,
        title: 'Crawling Confidence and Repetition',
        gentleFocus: 'Reinforcing previous learning through repetition and free movement',
        iconName: 'move',
        introduction:
          "At 10 months, many babies crawl, supporting themselves on their hands and knees with their torso parallel to the ground. Some children even crawl before this, and refine their movements at this stage. Allow your baby to crawl around the house with supervision.",
        sections: [
          {
            label: 'Social Development',
            points: [
              'Temperament begins to blossom. Some children are very sociable and smile at everyone; others are more reserved and hide their faces when a stranger approaches.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Repetition is the brain\'s way of consolidating learning. Each time your baby repeats an activity, the neural pathways involved become stronger and more efficient.',
        weeklyCta:
          'Repeat the games that your baby enjoyed most from previous cycles. Repetition is very important at this stage of development.',
      },
      {
        week: 2,
        title: 'Sound Development and Reading',
        gentleFocus: 'Expanding language through conversation and creating a reading space',
        iconName: 'message-circle',
        introduction:
          "This is a phase where babies are advancing, understanding simple words and phrases, making it very important to talk to them a lot. A good way to stimulate this is to repeat your child\'s words using adult language. For example, if they ask for \"water,\" you subtly teach the correct word by asking back: \"Do you want water?\"",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Build stacks of cubes yourself and let your baby knock them down.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Create a reading space — take little books, and also all the ones the baby has or has received as gifts, take some pillows and create a corner for the baby to "read," browse, and look at the illustrations.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'When you mirror your baby\'s words back in correct adult language, you are providing a powerful form of language scaffolding that supports vocabulary development without pressure.',
        weeklyCta:
          'Create a dedicated reading corner this week and spend time there daily with your baby.',
        extraGuidance: {
          title: 'Important note on electronics',
          points: [
            'After careful consideration, we advise against any use of cell phones or tablets at this stage, including electronic books and illustrations.',
          ],
        },
      },
      {
        week: 3,
        title: 'Spatial Awareness and Precision',
        gentleFocus: 'Developing fine motor skills and spatial concepts',
        iconName: 'brain',
        introduction:
          "Your baby is developing fascinating new spatial awareness skills. They play sitting down without falling, may crawl, creep, or walk (or be in the process of doing so), and move freely from side to side.",
        sections: [
          {
            label: 'Motor & Cognitive Development',
            points: [
              'Points to objects with index finger.',
              'Stretches out foot to put on shoes.',
              'Enjoys playing with objects that produce noise or musical sounds.',
              'You will notice a preference for objects with strong, contrasting colors.',
              'Acquires the concept of space, such as here, there, above, and below.',
            ],
          },
          {
            label: 'Stacking Activity',
            points: [
              'At this stage it will be difficult for them to stack more than two blocks, so the goal is to stack 3 or more.',
              'As the process unfolds, the baby will learn to manipulate the pieces well and perform more precise movements.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Pointing is a major cognitive milestone. It shows that your baby understands that objects exist independently and that they can direct your attention — a key building block for language and social interaction.',
        weeklyCta:
          'Practice stacking activities daily, celebrating each small achievement.',
      },
      {
        week: 4,
        title: 'Inside, Outside, and Early Communication',
        gentleFocus: 'Teaching spatial concepts and encouraging interactive communication',
        iconName: 'smile',
        introduction:
          "At this stage, the baby begins to acquire the notions of inside/outside. Start teaching movements like blowing kisses, yes, no, come here, and goodbye.\n\nAsk your baby for something — extend your hand and ask for something so that they move towards you and give it to you. Repeat activities several times. Repetition is the key to success.",
        sections: [
          {
            label: 'Engagement Tips',
            points: [
              'Many games will not have any effect the first time they are tried; however, if you insist, they will end up attracting the baby\'s attention and they will have a lot of fun.',
              'With each activity performed and with each achievement of your baby, celebrate with them and praise what they have just done.',
              'Suggestion: Use our stacking toy and if possible buy others.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Understanding "inside" and "outside" represents a leap in abstract thinking. Your baby is beginning to categorise the world, which is foundational for later mathematical and logical reasoning.',
        weeklyCta:
          'Practice giving and receiving objects with your baby daily, celebrating each interaction.',
        extraGuidance: {
          title: 'Extra tips',
          points: [
            'Your baby is probably already consciously seeking attention and reaction from adults, making funny faces — clap and celebrate their discoveries!',
            'Since the baby at this stage already knows how to point, ask where their favorite ball is, or a book, or the family dog/cat.',
            'Ask questions with simple yes or no answers, because the baby already understands and may even respond with a nod of their head.',
            'Variations in the execution time of an activity occur and change from child to child; just continue the process doing your best, and everything will be fine.',
          ],
        },
      },
    ],
    closingNote:
      'Month 10 is a time of consolidation and growing independence. Your baby is refining skills they have been building for months. Continue to provide loving encouragement and celebrate every small achievement together.',
  },
  // ─── MONTH 11 ───
  {
    month: 11,
    title: 'Month 11',
    subtitle: 'Growing independence',
    weeks: [
      {
        week: 1,
        title: 'Books and Storytelling',
        gentleFocus: 'Nurturing a love of reading and respecting developmental pace',
        iconName: 'brain',
        introduction:
          "Approaching their first birthday, the baby is no longer that fragile little thing who couldn't do anything without you. Although they still require a lot of care and attention, your baby's physical independence is becoming increasingly evident.",
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'At this stage, looking at books and turning pages is one of the little ones\' favorite pastimes, even if they can\'t necessarily turn one page at a time.',
              'Children usually have favorite books and always want to "read" the same ones.',
              'Take the opportunity to familiarize them with books; this practice will guarantee a future reader.',
              'Suggestion: Use finger puppets to tell stories and focus on reading this week.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Repetitive reading of the same book is not boring for your baby — it is building prediction skills, vocabulary, and a sense of narrative structure. Each re-reading strengthens neural pathways for language comprehension.',
        weeklyCta:
          'Read your baby\'s favorite book together daily this week, using finger puppets to bring the story alive.',
        extraGuidance: {
          title: 'Important note',
          points: [
            'You should not ask anything of the child, nor create expectations that do not correspond to the specific stage of development they are in.',
          ],
        },
      },
      {
        week: 2,
        title: 'Parallel Play and Imitation',
        gentleFocus: 'Supporting social development through play and early commands',
        iconName: 'smile',
        introduction:
          "The baby's individuality will emerge. At this stage, the baby begins to play alongside other children or siblings, but not together with them, in what is called parallel play — where they observe, are inspired, and do things alone.",
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Understands and imitates social rules and routines.',
              'Shows affection with hugs and cuddles, mainly for parents.',
              'Begins to "give" toys and take them back — or not.',
              'Obeys simple commands.',
            ],
          },
          {
            label: 'Activities',
            points: [
              'Time to scribble! Get some blank sheets of paper and let the baby scribble freely.',
              'Place 3 or 4 toys that you know your baby knows the name of, place them half a meter away and ask the baby "where is the ball?" for example. When the baby points, ask them to fetch it, pick it up, and give it to you.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Parallel play is not antisocial — it is a developmentally appropriate stage where babies learn by observing others. This watching and imitating builds the foundation for cooperative play that comes later.',
        weeklyCta:
          'Arrange a play session with another child this week, allowing your baby to observe and play alongside them.',
      },
      {
        week: 3,
        title: 'Large Muscle Groups and Boundaries',
        gentleFocus: 'Encouraging physical exploration while setting gentle limits',
        iconName: 'move',
        introduction:
          "Your baby is beginning to exercise larger muscle groups with increasing confidence and intention.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Pushes toys and other objects.',
              'Intentionally throws objects.',
              'Climbs and scales furniture (be careful!).',
              'Stands up without help and on their own initiative.',
              'Helps with dressing, stretching out their hand or foot.',
              'Suggestion: Place your baby near supports like a sofa so they can stand and walk along the edges. Supervise.',
            ],
          },
          {
            label: 'Emotional Development',
            points: [
              'Don\'t trivialize "no," as the baby begins to intentionally ignore it.',
              'Use "no" sparingly so your baby knows that when they hear "no," it\'s really to obey and that it\'s an important word.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'The urge to climb, push, and throw is driven by the developing motor cortex seeking new challenges. These large-muscle activities are essential for building the physical confidence your baby needs for walking and running.',
        weeklyCta:
          'Create a safe space where your baby can practice standing and walking along furniture edges daily.',
      },
      {
        week: 4,
        title: 'Memory and Character Recognition',
        gentleFocus: 'Activating memory through familiar stories and movement',
        iconName: 'brain',
        introduction:
          "At this stage, the baby scribbles with a pencil and really enjoys turning the pages of books and magazines.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'The more the baby moves and does activities like crawling, jumping, and trying to climb stairs, the better it will be for their motor development.',
              'This will strengthen their muscles and joints so they can walk better and better on their own.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'The baby already identifies favorite characters from books or cartoons.',
              'Take one of their favorite books and point to their favorite character and ask them what the character\'s name is.',
              'If there\'s a picture of a car, ask "What is this, my love?"',
              'The goal is to activate the baby\'s memory and response. In the first few questions, they will be lost. That\'s normal.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Character recognition shows that your baby is developing long-term memory and the ability to associate images with meaning. This is the same cognitive skill that will later support reading comprehension.',
        weeklyCta:
          'Spend time each day looking at a favorite book together, asking your baby to identify characters and objects.',
      },
    ],
    closingNote:
      'Month 11 is a beautiful time of growing independence and personality. Your baby is becoming their own person, with preferences, humor, and a growing ability to communicate their needs. Celebrate every small step on this journey.',
  },
  // ─── MONTH 12 ───
  {
    month: 12,
    title: 'Month 12',
    subtitle: 'First birthday milestones',
    weeks: [
      {
        week: 1,
        title: 'Walking Confidence',
        gentleFocus: 'Celebrating growing independence and physical confidence',
        iconName: 'move',
        introduction:
          "An important rite of passage is ready to happen — at some point this month, your baby will be able to feel more confident to walk alone without support, becoming more and more adventurous.\n\nWith faster fine motor coordination, your baby\'s movements now involve the exercise of larger muscles and the expenditure of more energy. Babies are very happy to push, throw, and play all the time.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Hit a ball and play for your baby, and encourage them to return/play the ball for you.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Independent walking is one of the most celebrated milestones of the first year. It represents the integration of balance, strength, spatial awareness, and confidence — a truly remarkable achievement of the developing brain and body.',
        weeklyCta:
          'Play ball with your baby daily, encouraging them to kick or roll it back to you.',
      },
      {
        week: 2,
        title: 'Dance, Music, and Sensory Universe',
        gentleFocus: 'Exploring the world through music, nature, and creative materials',
        iconName: 'music',
        introduction:
          "Play music that your baby likes and dance! Curiously, dancing is something that babies do instinctively without being taught.",
        sections: [
          {
            label: 'Continue Encouraging Perception of Our Universe',
            points: [
              'Natural elements: flowers, stones, nature exploration.',
              'Exposure to real foods: rice, chickpeas, pasta, lentils.',
              'Artistic materials: non-toxic ink for babies, chalk.',
              'Books and construction blocks.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Dancing to music activates multiple brain areas simultaneously — auditory processing, motor planning, rhythm perception, and emotional response. It is one of the most joyful and effective ways to support holistic brain development.',
        weeklyCta:
          'Have a daily dance session with your baby, playing different styles of music.',
      },
      {
        week: 3,
        title: 'Music, Rhythm, and Bilateral Brain Integration',
        gentleFocus: 'Using music as a tool for brain integration and bilateral coordination',
        iconName: 'music',
        introduction:
          "At twelve months, your baby is entering a powerful phase of motor coordination, rhythm recognition, and intentional imitation. This week, we focus on music as a tool for brain integration.",
        sections: [
          {
            label: 'The Baby Drum Experience',
            points: [
              'Offer your baby a small drum, soft percussion toy, or even a safe household alternative (such as an overturned bowl and wooden spoon).',
              'Encourage them to use both hands alternately to tap the surface.',
              'This strengthens "bilateral coordination" (the ability to use both sides of the body in a coordinated way).',
              'It also activates the "corpus callosum" (the neural bridge connecting the two brain hemispheres).',
              'And supports "motor planning" (the brain\'s ability to organise and execute movement sequences).',
              'Do not correct rhythm. Exploration is more important than precision.',
            ],
          },
          {
            label: 'Call-and-Response Clapping',
            points: [
              'Clap a simple pattern (clap–pause–clap) and wait.',
              'Even if your baby cannot reproduce it exactly, this strengthens turn-taking skills, working memory, and social timing.',
              'This type of interaction is sometimes referred to as early "proto-conversation" in developmental psychology.',
              'Repeat one simple rhythm daily and keep it consistent throughout the week.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Research in developmental neuroscience shows that rhythmic bilateral movement enhances inter-hemispheric communication and supports later skills such as writing, reading fluency, and coordinated sports movement.',
        weeklyCta:
          'Create a daily 10-minute rhythm session where your baby freely explores tapping with both hands. Sit in front of them and model alternating movements slowly.',
      },
      {
        week: 4,
        title: 'Music, Rhythm, and Bilateral Brain Integration',
        gentleFocus: 'Deepening neural rhythm, emotional synchrony, and bilateral integration through music',
        iconName: 'music',
        introduction:
          "This week is not about producing music. It is about building neural rhythm, emotional synchrony, and bilateral integration. Music at this age is brain architecture in motion. 🌊",
        sections: [
          {
            label: 'Action Songs With Movement',
            points: [
              'Choose songs that involve gestures, such as waving, tapping knees, and raising arms.',
              'Movement paired with music strengthens "sensorimotor integration" (coordination between sensory input and motor output).',
              'It also activates the cerebellum — a brain region deeply involved in rhythm and coordination.',
              'Select one song this week and repeat it daily with the same gestures. Repetition builds neural efficiency.',
            ],
          },
          {
            label: 'Freeze-and-Go Game',
            points: [
              'Play music and gently move together. When the music stops, freeze.',
              'This supports early "inhibitory control" (the ability to pause an action), attention shifting, and emotional regulation.',
              'Executive function begins developing long before formal schooling.',
              'Try this game twice this week and observe your baby\'s anticipation.',
            ],
          },
          {
            label: 'Soft Instrument Exploration Basket',
            points: [
              'Prepare a small basket with: a drum, soft maracas, wooden shakers, and fabric scarves for movement.',
              'Allow free exploration without instruction.',
              'Unstructured play strengthens "intrinsic motivation" (internal drive to explore and learn).',
            ],
          },
          {
            label: 'Emotional and Social Layer',
            points: [
              'Music is not only cognitive — shared rhythm increases oxytocin release (the bonding hormone) and synchronises heart rate patterns between caregiver and child.',
              'When you drum together, you are literally regulating nervous systems in synchrony.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose instruments made from natural materials where possible (wood, organic cotton straps).',
            'Avoid heavily painted plastics with strong chemical odours.',
            'Keep volume moderate — infant auditory systems are still developing.',
            'Create music moments without background television noise to protect auditory clarity.',
          ],
        },
        neurodevelopmentalNote:
          'Shared rhythm increases oxytocin release and synchronises heart rate patterns between caregiver and child. Music at this age builds neural rhythm, emotional synchrony, and bilateral integration — it is brain architecture in motion.',
        weeklyCta:
          'Select one action song and repeat it daily with the same gestures. Try the Freeze-and-Go game twice this week. Create a daily 10-minute free instrument exploration session.',
      },
    ],
    closingNote:
      'Happy first birthday! What an incredible journey this has been. Your baby has grown from a tiny, dependent newborn into a curious, mobile, communicating little person. Every gentle interaction, every patient moment, and every loving response has helped build the neural architecture that will support their lifelong learning. Be proud of the journey you have shared together.',
  },
  // ─── MONTH 13 ───
  {
    month: 13,
    title: 'Month 13',
    subtitle: 'Walking, words, and growing independence',
    weeks: [
      {
        week: 1,
        title: 'First Steps and Growing Autonomy',
        gentleFocus: 'Supporting walking development and early independence',
        iconName: 'move',
        introduction:
          "It is on average at thirteen months that a child learns to walk. This stage is important because it gives them a lot of autonomy, and with that, their personality tends to become more clear.\n\nWhile learning to walk concentrates all the baby's efforts, language learning stagnates a bit. But the baby already understands many things and masters some words like daddy, bread, and of course, no.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Now that they know how to walk, the baby goes wherever they want. Parental vigilance should be redoubled. Be careful with stairs.',
              'If the baby doesn\'t know how to walk yet, place toys on the sofa so that the baby can stand and support themselves, always under your supervision. This strengthens their muscles.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Walking is a major motor milestone that requires enormous neural coordination. While the brain focuses resources on locomotion, other areas like language may temporarily slow — this is normal and reflects how the brain prioritises learning.',
        weeklyCta:
          'Create safe spaces for your toddler to practise walking freely. If not yet walking, encourage standing with furniture support daily.',
      },
      {
        week: 2,
        title: 'Imitation, Independence, and Early Problem Solving',
        gentleFocus: 'Strengthening intentional action through imitation',
        iconName: 'eye',
        introduction:
          "At thirteen months, your toddler is strengthening intentional action. This week focuses on imitation and simple independent tasks.\n\nImitation at this age is not just cute — it reflects activation of the \"mirror neuron system\" (brain networks that fire both when performing and observing an action). These systems support empathy, language development, and social learning.",
        sections: [
          {
            label: 'Imitation of Daily Actions',
            points: [
              'Your toddler may begin copying: wiping a surface, brushing hair, stirring with a spoon, pretending to talk on the phone.',
              'This supports "motor planning" (organising movement sequences), "symbolic representation" (using one action to represent another), and early executive function development.',
              'Research in developmental psychology shows that imitation of real-life tasks strengthens neural circuits involved in learning by observation — a core human learning mechanism.',
            ],
          },
          {
            label: 'Weekly Activity – Mini Helper Tasks',
            points: [
              'Invite your toddler to participate in simple daily routines.',
              'Hand them a small cloth to wipe a safe surface.',
              'Let them place socks into a basket.',
              'Allow supervised spoon stirring.',
              'The goal is not perfection. It is participation.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'The mirror neuron system fires both when performing and observing an action. When your toddler imitates you, they are building neural circuits for empathy, language, and social learning — all through the simple act of copying daily life.',
        weeklyCta:
          'Choose one small daily task and consistently invite your toddler to participate every day this week. Consistency builds neural efficiency.',
      },
      {
        week: 3,
        title: 'Language and Labelling Expansion',
        gentleFocus: 'Building receptive language through narration and repetition',
        iconName: 'message-circle',
        introduction:
          "Many toddlers at this stage understand far more words than they can say.\n\nThis stage reflects growth in \"receptive language\" (words understood) and strengthening of pathways between Wernicke's area (language comprehension) and Broca's area (speech production).",
        sections: [
          {
            label: 'Language Strategies',
            points: [
              'Narrate simple actions: "You\'re stirring." "You found the ball." "That\'s heavy."',
              'Repetition builds "semantic networks" (brain maps of meaning).',
              'Choose five core words this week and repeat them daily in natural context.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'At this age, the gap between receptive and expressive language is wide and normal. Your toddler understands far more than they can say. Narrating daily life builds the semantic networks that will soon power a vocabulary explosion.',
        weeklyCta:
          'Choose five core words this week and repeat them daily in natural context.',
      },
      {
        week: 4,
        title: 'Emotional Development – Safe Autonomy',
        gentleFocus: 'Supporting healthy independence and co-regulation',
        iconName: 'heart',
        introduction:
          "This is the beginning of visible independence.\n\nYou may notice resistance to help, frustration when interrupted, and determination. This is healthy.",
        sections: [
          {
            label: 'Understanding Emotional Outbursts',
            points: [
              'Emotional outbursts at this age reflect an immature "prefrontal cortex" combined with strong limbic activation (emotional brain).',
              'Co-regulation remains essential.',
              'Stay calm. Model slow breathing. Keep boundaries gentle and consistent. Show them how to breathe deeply.',
            ],
          },
          {
            label: 'Regulation Strategies',
            points: [
              'When frustration appears, lower your voice rather than raising it.',
              'Your nervous system teaches theirs.',
              'Gentle, consistent boundaries create emotional safety — not rigidity.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'The prefrontal cortex — responsible for impulse control and emotional regulation — is one of the last brain regions to mature. Your calm presence literally helps regulate your toddler\'s nervous system through co-regulation.',
        weeklyCta:
          'When frustration appears, lower your voice rather than raising it. Your nervous system teaches theirs.',
      },
    ],
    closingNote:
      'Month 13 marks the beginning of a new chapter. Your toddler is no longer a baby — they are becoming a person with opinions, preferences, and a growing sense of self. Every moment of patient guidance helps build the emotional and cognitive foundations for the years ahead.',
  },
  // ─── MONTH 14 ───
  {
    month: 14,
    title: 'Month 14',
    subtitle: 'Belonging, nature, and sensory exploration',
    weeks: [
      {
        week: 1,
        title: 'Music, Rhythm, and Sensory Integration',
        gentleFocus: 'Using music and touch to support regulation and capability',
        iconName: 'music',
        introduction:
          "This week is about allowing your toddler to feel capable. Not controlled. Not corrected constantly. Capable. Because autonomy, when safely supported, becomes confidence.",
        sections: [
          {
            label: 'Music Integration – Clean-Up Songs',
            points: [
              'Sing simple clean-up songs during mini-helper tasks.',
              'Rhythm supports task sequencing, emotional regulation, and predictability.',
              'Music activates both hemispheres and strengthens timing networks in the cerebellum.',
            ],
          },
          {
            label: 'Sensory Integration – Gentle Ball Massage',
            points: [
              'Use soft textured balls to provide a calming sensory massage.',
              'Gently roll the balls over the back, the soles of the feet, and the palms of the hands.',
              'This stimulates the "somatosensory system" (the body\'s touch-processing network) and can support body awareness and regulation.',
              'Research in infant massage and tactile stimulation (Field, 2010, Developmental Review) suggests that structured tactile input can support emotional regulation and nervous system stability.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose wooden or natural-material household tools for play imitation when possible.',
            'Avoid strongly fragranced cleaning products during toddler participation.',
            'Prefer organic cotton clothing to support skin health and reduce synthetic exposure.',
            'The developing nervous system is sensitive to environmental load. Reducing chemical exposure supports long-term resilience.',
            'Choose balls made from non-toxic, natural materials when possible.',
            'Avoid strongly scented plastic toys.',
          ],
        },
        neurodevelopmentalNote:
          'Structured tactile input through gentle massage stimulates the somatosensory system and supports emotional regulation and nervous system stability. Combined with music, these activities build multi-sensory neural integration.',
        weeklyCta:
          'Introduce a daily music-and-movement routine during clean-up time. Follow with a 2-minute gentle ball massage for calming.',
      },
      {
        week: 2,
        title: 'Understanding Egocentrism and Early Social Behaviour',
        gentleFocus: 'Navigating the egocentric stage with patience and gentle guidance',
        iconName: 'smile',
        introduction:
          "Does it seem like the whole world revolves around your child? Well, that's exactly what they think. For several months from now, the child will think almost only about themselves. That's why lending a toy or sharing fruit is so difficult.",
        sections: [
          {
            label: 'Emotional Development',
            points: [
              'At 1 year and 2 months, children still don\'t understand what other people feel — they are not yet capable of empathy.',
              'For them, other friends are nothing more than objects. It\'s not selfishness: everyone is like that at this age.',
              'When they are playing with other children, stay close to intervene when necessary.',
              'The best way is to say "You can\'t hit, because it hurts!" and remove the child from the situation.',
              'Try not to pay too much attention to bad behaviour, because otherwise your child may start repeating it on purpose.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Egocentrism at this age is not a character flaw — it is a normal developmental stage. The brain regions responsible for perspective-taking and empathy are still years away from full maturation. Patience now builds the foundation for social understanding later.',
        weeklyCta:
          'When conflicts arise during play, calmly name the feeling ("That hurt") and redirect. Avoid lengthy explanations — keep it simple and consistent.',
      },
      {
        week: 3,
        title: 'Social Exposure, Sensory Play, and Bilateral Coordination',
        gentleFocus: 'Gentle peer exposure and parallel play foundations',
        iconName: 'sun',
        introduction:
          "At fourteen months, your toddler is expanding their awareness of the social world. Even if they are not yet ready for fully cooperative play, simple exposure to other children is developmentally beneficial.",
        sections: [
          {
            label: 'Social Development – Gentle Peer Exposure',
            points: [
              'If your child does not have siblings and does not attend nursery or childcare, consider gradually introducing environments where they can observe and be around children of a similar age.',
              'For example: a local park, a playground, a relative\'s garden, or small informal play meet-ups.',
              'At this stage, toddlers typically engage in "parallel play" (playing alongside, rather than directly with, other children). This is a normal and healthy stage of social development.',
              'Research by Mildred Parten (1932) on stages of play shows that parallel play is a foundational step toward cooperative interaction. More recent findings indicate that early peer exposure supports social competence and emotional regulation development.',
              'Gradually, your toddler will begin to perceive that being around other children is enjoyable and safe.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Parallel play — playing alongside rather than with other children — is not a sign of social difficulty. It is a healthy, necessary stage of development that builds the foundation for cooperative play and social competence.',
        weeklyCta:
          'This week, plan at least one outdoor visit where your toddler can observe or be near other children without pressure to interact.',
      },
      {
        week: 4,
        title: 'Nature, Animal Interest, and Motor Coordination',
        gentleFocus: 'Stimulating curiosity through nature, water play, and bilateral movement',
        iconName: 'sun',
        introduction:
          "At fourteen months, many toddlers show strong curiosity about animals. This reflects growth in \"categorisation skills\" (the ability to group living things conceptually) and \"symbolic representation\" (understanding that an animal picture represents a real animal).",
        sections: [
          {
            label: 'Nature and Animal Exploration',
            points: [
              'A visit to a zoo, farm, or even observing birds in a park can stimulate language and cognitive development.',
              'Water play is also highly beneficial at this age — it supports sensory integration, fine motor control, and cause-and-effect understanding.',
              'Always supervise closely.',
              'Introduce one structured water play session this week — pouring, splashing gently, or transferring water between containers.',
            ],
          },
          {
            label: 'Motor Development – Soft Ball Coordination Practice',
            points: [
              'Use a soft, lightweight ball to support bilateral motor development.',
              'Ask your toddler to hold the ball with both hands.',
              'Encourage them to open and close their hands around the ball (grip and release).',
              'Then gently roll or throw the ball toward you. Repeat in a slow, rhythmic pattern for approximately one minute.',
              'This strengthens "bilateral coordination" (using both sides of the body together), "grip strength" (important for later writing skills), and "motor planning" (organising movement sequences).',
              'Rhythmic repetition supports cerebellar timing circuits and neural synchronisation.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Prefer outdoor social exposure in natural environments over indoor overstimulating settings.',
            'Choose balls made from non-toxic, natural materials when possible.',
            'Avoid strongly scented plastic toys.',
          ],
        },
        neurodevelopmentalNote:
          'At fourteen months, your toddler is not just learning to play — they are learning how to belong. Curiosity about animals reflects growing categorisation skills, while bilateral ball play strengthens the neural circuits that connect both brain hemispheres.',
        weeklyCta:
          'Practise the rhythmic ball exchange daily for one minute. Introduce one structured water play session. Focus on rhythm, not performance.',
      },
    ],
    closingNote:
      'At fourteen months, your toddler is learning how to belong — to the family, to the world of peers, and to the natural environment around them. Every gentle exposure, every shared moment of play, builds the social and sensory foundations for confident exploration ahead.',
  },
];
