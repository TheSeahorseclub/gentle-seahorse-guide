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
  // ─── MONTH 15 ───
  {
    month: 15,
    title: 'Month 15',
    subtitle: 'Walking confidence and fine motor precision',
    weeks: [
      {
        week: 1,
        title: 'Walking Confidence and Expanding Independence',
        gentleFocus: 'Balance, confidence, and spatial awareness',
        iconName: 'move',
        introduction:
          "At fifteen months, many toddlers are either newly walking or rapidly refining their walking skills. Walking is not just a motor milestone — it represents a major neurological reorganisation.\n\nThe more a toddler moves independently, the more they learn about cause, effect, space, and risk assessment.",
        sections: [
          {
            label: 'Motor Development – Refining Independent Walking',
            points: [
              'At this stage, your toddler may walk with arms slightly raised, fall frequently and recover quickly, attempt turning while walking, and carry objects while moving.',
              'Walking strengthens "vestibular integration" (the balance system in the inner ear), "proprioception" (the body\'s awareness of its position in space), and "postural control" (automatic muscle coordination for upright balance).',
              'Research published in Developmental Science (Adolph & Robinson, 2015) shows that early walking experience increases environmental exploration and supports cognitive development through active learning.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Walking represents a major neurological reorganisation. The brain must coordinate vestibular input, proprioception, and postural control simultaneously — this is why walking unlocks so much cognitive growth through active exploration.',
        weeklyCta:
          'Create safe spaces for your toddler to practise walking freely. Provide at least 20 minutes of uninterrupted walking exploration daily.',
      },
      {
        week: 2,
        title: 'Obstacle Play, Emotional Autonomy, and Movement Language',
        gentleFocus: 'Safe exploration, co-regulation, and narrating movement',
        iconName: 'hand',
        introduction:
          "This week combines physical challenge with emotional development and language expansion. Your toddler is learning to navigate obstacles, manage frustration, and connect words to movement.",
        sections: [
          {
            label: 'Weekly Activity – Safe Obstacle Path',
            points: [
              'Create a simple, safe walking path using cushions, low foam blocks, and soft mats.',
              'Encourage stepping over or walking around objects. Do not over-direct. Allow experimentation.',
              'This supports "motor planning" (organising movement sequences) and early "executive function" (decision-making during movement).',
            ],
          },
          {
            label: 'Carry and Transport Play',
            points: [
              'Toddlers at this age love carrying objects while walking.',
              'This strengthens core stability, hand–body coordination, and dual-task processing (managing movement and object handling simultaneously).',
              'Offer lightweight, safe objects such as a soft toy, a small basket, or a wooden spoon.',
              'Encourage your toddler to transport objects from one place to another once per day.',
            ],
          },
          {
            label: 'Emotional Development – Emerging Autonomy',
            points: [
              'You may notice increased determination: saying "no", pulling away, wanting to do things independently.',
              'This reflects development of early autonomy. However, the "prefrontal cortex" (responsible for impulse control and regulation) is still immature.',
              'Emotional responses can be intense and sudden. Remain calm and consistent.',
              'Research in early self-regulation (Calkins, 2007, Child Development) highlights that caregiver co-regulation remains the primary regulatory mechanism at this age.',
              'When frustration appears, kneel to eye level and use short, calm phrases instead of long explanations. Your nervous system remains their anchor.',
            ],
          },
          {
            label: 'Language Expansion – Naming Movement',
            points: [
              'At fifteen months, receptive language (words understood) is expanding rapidly.',
              'Narrate movement: "You\'re walking fast." "You stepped over." "That was high."',
              'This strengthens "semantic mapping" (building networks of meaning in the brain).',
              'Movement-linked language is particularly powerful because it pairs motor cortex activation with language networks.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Allow barefoot walking indoors when safe. Direct foot contact enhances sensory feedback and strengthens intrinsic foot muscles.',
            'Choose breathable, natural-fibre clothing to support comfort during movement.',
            'Avoid restrictive walkers or devices that limit natural balance development.',
            'Natural movement builds natural confidence.',
          ],
        },
        neurodevelopmentalNote:
          'Falling, trying again, adjusting — this is brain development in motion. Walking is not just a milestone. It is independence beginning to unfold.',
        weeklyCta:
          'Provide at least 20 minutes of uninterrupted walking exploration daily. Choose three movement words and repeat them consistently this week.',
      },
      {
        week: 3,
        title: 'Following Instructions and Fine Motor Precision',
        gentleFocus: 'Language comprehension and hand coordination development',
        iconName: 'brain',
        introduction:
          "At fifteen months, your toddler is strengthening both language comprehension and fine motor coordination. This week focuses on simple instruction-following and hand precision development.",
        sections: [
          {
            label: 'Cognitive & Language Development – Understanding Simple Instructions',
            points: [
              'Many toddlers are able to follow simple one-step instructions, such as: "Please bring your shoe." "Give me the ball." "Put it in the box."',
              'This reflects growth in "receptive language" (words understood before they are spoken), "auditory processing" (the brain\'s ability to interpret spoken language), and early "working memory" (holding information briefly in mind to complete a task).',
              'Research in early language development (Fernald et al., 2012, Psychological Science) demonstrates that stronger early receptive vocabulary predicts later language fluency and cognitive outcomes.',
              'Encourage instruction-following in a calm and playful way — never as a test.',
            ],
          },
          {
            label: 'Motor Development – Coordination and Spatial Awareness',
            points: [
              'Offer toys that support stacking, balancing pieces, and simple shape puzzles.',
              'These activities strengthen "visuospatial processing" (understanding how objects relate in space), "hand–eye coordination", and early problem-solving circuits.',
              'Stacking and fitting objects require trial-and-error learning, which strengthens neural planning pathways in the developing frontal lobes.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Stronger early receptive vocabulary predicts later language fluency and cognitive outcomes. When your toddler follows a simple instruction, multiple brain systems — auditory processing, working memory, and motor planning — are working together.',
        weeklyCta:
          'Use one simple daily instruction during routine activities and celebrate completion with positive reinforcement.',
      },
      {
        week: 4,
        title: 'Lacing, Fine Motor Skills, and Hemispheric Balance',
        gentleFocus: 'Building pincer refinement and bilateral coordination through lacing',
        iconName: 'hand',
        introduction:
          "Lacing activities are highly beneficial in early childhood education because they develop \"fine motor skills\" (small, precise movements of the hands and fingers). These skills are foundational for writing, drawing, tracing, buttoning, and tying shoelaces.",
        sections: [
          {
            label: 'Focus Activity – Lacing Practice',
            points: [
              'Lacing supports "pincer refinement" (precise thumb-to-finger control), bilateral coordination (both hands working together), finger strength, and motor sequencing.',
              'Demonstrate slowly how to thread the lace. Allow your toddler to attempt independently.',
              'Expect irregular movements — precision develops gradually.',
            ],
          },
          {
            label: 'Hand Alternation for Brain Balance',
            points: [
              'On one day, gently guide more active use of the right hand. On the following day, encourage use of the left hand.',
              'Alternating hands strengthens hemispheric activation and supports balanced "neural lateralisation" (development of functional differences between the two brain hemispheres).',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Lacing strengthens pincer refinement, bilateral coordination, and motor sequencing — all foundational skills for later writing and drawing. Alternating hand emphasis supports balanced neural lateralisation across both brain hemispheres.',
        weeklyCta:
          'Practise lacing for 3–5 minutes, three times this week, alternating hand emphasis on different days. Keep the activity light and positive.',
      },
    ],
    closingNote:
      'At fifteen months, your toddler is refining the art of independent movement and precise hand control. Every step, every grasp, every small instruction followed is strengthening the neural architecture for learning, language, and confidence.',
  },
  // ─── MONTH 16 ───
  {
    month: 16,
    title: 'Month 16',
    subtitle: 'Singing, empathy, and self-awareness',
    weeks: [
      {
        week: 1,
        title: 'Singing, Rhythm, and Auditory Brain Development',
        gentleFocus: 'Using singing as a cognitive and language-building tool',
        iconName: 'music',
        introduction:
          "At sixteen months, your toddler's brain is highly responsive to rhythm, repetition, and sound patterns. This week focuses on singing as a powerful cognitive and language-building tool.\n\nAny moment can become a singing moment.",
        sections: [
          {
            label: 'Cognitive & Sound Development – Singing Everywhere',
            points: [
              'Sing to your child whenever possible — at home, at the supermarket, during bath time, before sleep.',
              'Repeat the songs — at this age, repetition strengthens "auditory discrimination" (the brain\'s ability to distinguish between sounds) and supports "phonological awareness" (recognising sound patterns in language), which later becomes foundational for reading.',
              'Research published in Developmental Science suggests that early rhythmic exposure enhances speech processing and language development.',
            ],
          },
          {
            label: 'Repetition Builds Memory',
            points: [
              'Repeat songs frequently so your toddler begins to anticipate and memorise parts of them.',
              'Repetition strengthens "neural encoding" (the process of storing information in long-term memory).',
              'You may create a small family playlist — inspired by your own culture and story — choosing familiar songs and playing them consistently.',
              'Predictability builds confidence.',
            ],
          },
          {
            label: 'Add Movement – Actions and Gestures',
            points: [
              'Music becomes even more powerful when paired with movement.',
              'Add simple actions: clapping, tapping knees, waving, stomping, making animal sounds, using hands to imitate rain, wind, or animals.',
              'This strengthens "sensorimotor integration" (coordination between movement and sensory input), "bilateral coordination", and mirror neuron activation.',
              'Songs with gestures support cerebellar development, which plays a key role in timing, coordination, and even aspects of language fluency.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Early rhythmic exposure enhances speech processing and language development. Repetition strengthens auditory discrimination and neural encoding — the foundation for phonological awareness that later supports reading.',
        weeklyCta:
          'Choose two songs this week and repeat them daily in different settings. Add one consistent gesture to a favourite song. Consistency is more powerful than variety.',
      },
      {
        week: 2,
        title: 'Emotional Expression and Learning to Care',
        gentleFocus: 'Modelling affection and nurturing behaviour through play',
        iconName: 'heart',
        introduction:
          "At sixteen months, your toddler is developing early forms of empathy and emotional understanding. This week focuses on modelling affection and nurturing behaviour through play.\n\nThey do not learn kindness from instruction. They learn it from watching.",
        sections: [
          {
            label: 'Affective & Social Development – "Lots of Love" Game',
            points: [
              'This game helps your child develop "emotional modelling" (learning emotions through observation), early empathy, and "prosocial behaviour" (caring actions towards others).',
              'The "mirror neuron system" (brain networks involved in copying and understanding others\' actions) is highly active at this stage.',
            ],
          },
          {
            label: 'How to Play – Step by Step',
            points: [
              'Sit comfortably on the floor with your child. Place two or three soft toys in front of you.',
              'Choose one toy and gently hug it. Use warm, affectionate language: "It\'s so lovely to play with you." "I love you." "You make me happy."',
              'Speak slowly and warmly. Exaggerate tone slightly.',
              'Hand a toy to your child. Invite them to hug or kiss it. Celebrate any attempt — even a brief squeeze counts.',
              'Over time, you may notice them repeating the behaviour independently. This signals internalisation of the emotional script.',
            ],
          },
          {
            label: 'Expanding the Game – Emotional Labelling',
            points: [
              'Gently add simple emotion words: "Teddy feels happy." "Baby is tired." "That was gentle."',
              'This supports "emotion recognition" (identifying feelings in self and others), a core predictor of later self-regulation.',
            ],
          },
          {
            label: 'Autonomy Layer – Independent Caring',
            points: [
              'If your toddler begins pretending to feed, rock, or comfort a toy, allow it.',
              'This is early "symbolic play" (using objects to represent real-life experiences), a major cognitive milestone linked to later creativity and cognitive flexibility.',
              'Observe for one moment this week when your toddler spontaneously comforts a toy — and simply reflect it back calmly: "You\'re taking care of the bunny."',
            ],
          },
          {
            label: 'Emotional Regulation Through Affection',
            points: [
              'Affectionate play increases oxytocin levels (a hormone linked to bonding and emotional safety).',
              'Shared warmth during play strengthens attachment security.',
              'At this age, secure attachment is the foundation for future independence.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose soft toys made from natural fabrics where possible.',
            'Avoid toys with loud electronic sounds during this activity — emotional play benefits from calm environments.',
            'Keep lighting soft and the setting predictable.',
          ],
        },
        neurodevelopmentalNote:
          'By modelling affectionate behaviour, you help strengthen affective association networks, early compassion pathways, and emotional vocabulary foundations. Research shows that toddlers exposed to consistent emotional labelling demonstrate stronger empathy and social competence later in childhood.',
        weeklyCta:
          'Play "Lots of Love" at least three times this week, keeping sessions short and joyful. Model first. Invite second. Never force.',
      },
      {
        week: 3,
        title: 'Self-Awareness, Facial Control, and Early Problem Solving',
        gentleFocus: 'Mirror play and cognitive challenge for growing self-awareness',
        iconName: 'eye',
        introduction:
          "At sixteen months, toddlers are becoming more aware of themselves as separate individuals. This week focuses on mirror play and early cognitive challenge.",
        sections: [
          {
            label: 'Cognitive & Motor Development – Mirror Awareness Play',
            points: [
              'Sit in front of a mirror with your child and allow them to observe their own reflection.',
              'Encourage gentle exploration of facial movement: smile together, open and close the mouth, stick out the tongue, look at their teeth, make a funny face, blink slowly.',
              'You may also offer a small snack and allow them to observe themselves chewing with their mouth closed.',
              'This strengthens "self-recognition" (awareness of oneself as an individual), "body schema" (the brain\'s internal map of the body), oral-motor control, and facial muscle coordination.',
              'Around this age, toddlers are refining their understanding that "the person in the mirror is me".',
            ],
          },
          {
            label: 'Structured Play – Wooden Puzzle Exploration',
            points: [
              'Introduce a simple wooden puzzle suitable for toddlers.',
              'This supports problem-solving skills, visuospatial reasoning (understanding shapes and spatial relationships), hand–eye coordination, and attention and concentration.',
              'Demonstrate one piece slowly. Allow your toddler to attempt independently.',
              'Resist correcting immediately — trial and error builds neural resilience.',
              'Unlike electronic toys, simple puzzles require active thinking and persistence.',
            ],
          },
          {
            label: 'Emotional Layer – Confidence Through Mastery',
            points: [
              'When toddlers recognise themselves in the mirror and complete a puzzle piece independently, they strengthen "self-efficacy" (belief in their own ability), frustration tolerance, and early executive function.',
              'Small successes build long-term confidence.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose puzzles made from natural, non-toxic wood with safe finishes.',
            'Avoid mirrors that distort reflection — clarity supports accurate self-recognition.',
            'Keep the environment calm and free from background screens to protect attention.',
          ],
        },
        neurodevelopmentalNote:
          'Mirror play stimulates areas of the brain involved in identity formation and motor planning. Self-observation builds deeper motor precision and confidence. Self-awareness is quietly growing.',
        weeklyCta:
          'Spend five minutes this week in intentional mirror play. Offer puzzle play three times for short, focused sessions (3–5 minutes). Stop while interest is still present.',
      },
      {
        week: 4,
        title: 'Balance, Concentration, and Early Number Awareness',
        gentleFocus: 'Dynamic balance play and introducing first numerical concepts',
        iconName: 'brain',
        introduction:
          "At sixteen months, toddlers are strengthening both physical balance and early cognitive categorisation skills. This week focuses on dynamic balance play and introducing first numerical concepts in a natural, playful way.",
        sections: [
          {
            label: 'Motor Development – Rocking Horse Balance Play',
            points: [
              'A rocking horse with removable wooden balancing bars or pieces is an excellent tool at this stage.',
              'As your toddler places the wooden pieces onto the rocking base, they must adjust their movements while the structure gently wobbles.',
              'This strengthens "vestibular processing" (the balance system in the inner ear), "postural control", hand–eye coordination, and sustained attention.',
              'Because the base moves slightly, your toddler must continuously correct their posture — activating core muscles and improving motor planning.',
            ],
          },
          {
            label: 'Cognitive Development – Introducing Numbers up to Five',
            points: [
              'At sixteen months, toddlers are not yet counting independently, but they can begin developing "number sense" (an intuitive understanding of quantity).',
              'Start by counting small, visible groups of objects: "One, two" (while holding two soft balls). "One spoon for you, one spoon for Mummy." "Two shoes."',
              'Keep it natural and embedded in daily life.',
              'Research in early numeracy development suggests that repeated exposure to small-number grouping supports later mathematical reasoning.',
            ],
          },
          {
            label: 'Use Songs and Rhymes',
            points: [
              'Introduce simple counting songs and rhythmic rhymes.',
              'Music strengthens "auditory sequencing" (understanding order and pattern), which supports both numeracy and language development.',
              'Rhythm helps anchor memory.',
            ],
          },
          {
            label: 'Everyday Enumeration',
            points: [
              'Narrate small quantities during ordinary moments: "One cup." "Two socks." "One for you, one for me."',
              'This strengthens conceptual categorisation, early logical thinking, and language–number integration.',
              'At this stage, understanding quantity is more important than correct verbal counting.',
            ],
          },
          {
            label: 'Emotional Layer – Mastery Through Challenge',
            points: [
              'Balance toys that wobble slightly introduce manageable instability — teaching adjustment, focus, and persistence.',
              'Small physical challenges strengthen emotional resilience.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose wooden rocking toys with safe, non-toxic finishes.',
            'Ensure the rocking motion is gentle and stable.',
            'Avoid overstimulating electronic counting toys; simple repetition is more effective for neural development.',
            'Extra suggestion: Make a panel or create a space where the child can paint, get messy, and be absorbed for as long as they want, discovering colours and experimenting freely. Use non-toxic paint and appropriate brushes.',
          ],
        },
        neurodevelopmentalNote:
          'The child counts at this stage without fully understanding the concept of counting yet, and that is perfectly fine. It is only around age 3 that the child will understand that adding an item increases the quantity. Balance in the body, balance in the mind — small numbers, small adjustments, big development.',
        weeklyCta:
          'Offer short balance-play sessions three times this week. Count small groups (1–2 items) daily during natural routines. Keep it light and joyful — this is exposure, not instruction.',
      },
    ],
    closingNote:
      'Month 16 has been a journey through singing, empathy, self-awareness, and early numeracy. Your toddler is building the emotional and cognitive architecture that will support deeper learning in the months ahead. Love is learned through repetition. Small hugs today become emotional intelligence tomorrow.',
  },
  // ─── MONTH 17 ───
  {
    month: 17,
    title: 'Month 17',
    subtitle: 'Sound, creativity, and emotional boundaries',
    weeks: [
      {
        week: 1,
        title: 'Describing the World and Exploring Sound',
        gentleFocus: 'Rich verbal description and sound exploration for speech development',
        iconName: 'message-circle',
        introduction:
          "At seventeen months, your toddler's brain is rapidly strengthening language pathways. This week focuses on rich verbal description and sound exploration to support speech development.\n\nThe more meaningful words they hear, the more connections their brain builds.",
        sections: [
          {
            label: 'Cognitive & Sound Development – Describe Everything',
            points: [
              'Describe not only objects and people, but also sensations and experiences.',
              '"Can you feel how warm the floor is?" "The dog\'s fur is so soft." "The wind is cold today." "That water feels wet."',
              'This strengthens "receptive language" (words understood before spoken), "sensory-language mapping" (connecting physical sensations to vocabulary), and semantic networks.',
              'Research shows that toddlers exposed to rich, descriptive language develop stronger vocabulary foundations and improved expressive language later on (Hart & Risley, 1995; Weisleder & Fernald, 2013).',
            ],
          },
          {
            label: 'Sound Exploration – Listening and Imitation',
            points: [
              'Expose your toddler to a variety of everyday sounds: rain, wind, birds, the washing machine, the kettle boiling, the vacuum cleaner.',
              'Model the sound yourself and invite them to imitate it. For example: "Can you hear the rain? Pitter-patter." "The washing machine goes whoosh."',
              'This supports "auditory discrimination" (distinguishing between different sounds), "phonemic awareness" (recognising sound patterns), and early vocal imitation.',
              'Imitation activates the mirror neuron system, strengthening speech production pathways.',
            ],
          },
          {
            label: 'Sensory Sound Play – Homemade Shaker',
            points: [
              'Create a simple sound shaker using a small plastic bottle filled with dry grains such as rice, lentils, dried beans, or sweetcorn kernels.',
              'Ensure the lid is securely sealed and supervised at all times.',
              'Different grains produce different sound textures, which enhances sensory discrimination.',
              'Explore two different shaker sounds and compare them: "This one is louder. This one is softer."',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Avoid overstimulating background television noise, which interferes with sound clarity.',
            'Prioritise real-world sounds over electronic toy sounds.',
            'Ensure any homemade shaker is securely sealed and used under supervision.',
          ],
        },
        neurodevelopmentalNote:
          'Words begin in sound. Sound becomes meaning. Meaning becomes speech. Language grows best in environments where children feel heard.',
        weeklyCta:
          'Choose one daily routine and intentionally describe at least five sensations. Explore two new environmental sounds through listening and imitation. Celebrate attempts, not accuracy.',
      },
      {
        week: 2,
        title: 'Creativity, Early Drawing, and Imaginative Expression',
        gentleFocus: 'Creative exploration through drawing and natural art play',
        iconName: 'sparkles',
        introduction:
          "At seventeen months, your toddler is developing greater control over hand movements and beginning to express ideas visually. This week focuses on creative exploration through drawing and natural art play.\n\nA scribble today is the beginning of design thinking tomorrow.",
        sections: [
          {
            label: 'Cognitive Development – Drawing and Mark-Making',
            points: [
              'Encourage your child to draw freely. At this age, toddlers love painting, colouring, scribbling, and exploring crayons and chunky pencils.',
              'You may now notice slightly more control — using different areas of the paper, adjusting pressure, attempting circular movements, pausing to look at their marks.',
              'This reflects growth in "fine motor control", "visual-motor integration" (coordinating hand movement with what the eyes see), and early symbolic thinking.',
              'Research suggests that mark-making supports neural pathways later used for writing and spatial organisation.',
              'Allow imagination to lead. Avoid correcting or directing what the drawing should be.',
            ],
          },
          {
            label: 'Outdoor Collection and Natural Collage',
            points: [
              'During walks or outdoor play, collect natural items together: leaves, small stones, twigs, flower petals.',
              'Back at home, use these materials to create a simple collage.',
              'This strengthens sensory exploration, categorisation skills, early design thinking, and attention and concentration.',
              'Handling natural materials also supports tactile discrimination and environmental awareness.',
            ],
          },
          {
            label: 'Safety and Supervision',
            points: [
              'Always remain nearby during art activities. Objects may still go into the mouth, glue and small items require supervision, and frustration may arise quickly.',
              'Gentle presence supports safe exploration and emotional regulation.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose non-toxic, washable crayons and paints.',
            'Prefer natural, sustainable art materials where possible.',
            'Avoid overstimulating electronic drawing toys; open-ended materials are more beneficial for brain development.',
          ],
        },
        neurodevelopmentalNote:
          'Creative expression at this stage builds autonomy, self-expression, and frustration tolerance. Art is not about producing something beautiful — it is about building neural coordination between imagination and movement.',
        weeklyCta:
          'Offer drawing time three times this week for short sessions (10 minutes or more). Plan one nature-collection walk and create a small art piece together afterwards.',
      },
      {
        week: 3,
        title: 'Strength, Precision, and Early Logical Thinking',
        gentleFocus: 'Purposeful striking movements and structured stacking play',
        iconName: 'hand',
        introduction:
          "At seventeen months, toddlers are strengthening both gross and fine motor control while also developing early planning skills. This week focuses on purposeful striking movements and structured stacking play.",
        sections: [
          {
            label: 'Motor Development – Hammer Bench (Peg Pounder Toy)',
            points: [
              'Introduce your child to a wooden peg bench with four wooden pegs and a small child-safe hammer.',
              'The child uses the hammer to tap the pegs down. Once all pegs are pushed through, the bench can be turned over and the activity begins again.',
              'This strengthens hand–eye coordination, bilateral coordination, grip strength, upper limb muscle development, and "motor planning".',
              'The striking action also supports proprioceptive feedback (body awareness through pressure and force).',
              'Repetition builds neural efficiency.',
            ],
          },
          {
            label: 'Cognitive & Motor Integration – Stacking Tower',
            points: [
              'Whether stacking rings, blocks, or balancing shapes, this activity supports fine motor coordination, attention span, colour recognition, quantity awareness, "visuospatial reasoning", logical sequencing, and planning skills.',
              'Stacking requires prediction and adjustment. If the tower falls, your toddler learns through trial and error — a key component of early problem-solving.',
              'Research in early executive function development shows that hands-on construction play strengthens frontal lobe circuits responsible for planning and cognitive flexibility.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose wooden toys with non-toxic finishes where possible.',
            'Avoid electronic versions that remove the need for active thinking.',
            'Ensure the hammer is appropriately sized and safe for small hands.',
          ],
        },
        neurodevelopmentalNote:
          'At seventeen months, success in physical tasks builds emotional resilience. Learning happens best when challenge meets encouragement. Play becomes structured learning — without losing the fun.',
        weeklyCta:
          'Offer 10-minute peg-hammer sessions three times this week. Introduce one daily stacking challenge and celebrate effort more than outcome.',
      },
      {
        week: 4,
        title: 'Emotional Development and Early Self-Control',
        gentleFocus: 'Understanding boundaries, autonomy, and co-regulation',
        iconName: 'heart',
        introduction:
          "At seventeen months, your toddler is not being \"naughty\" — they are learning about boundaries, autonomy, and emotional regulation.\n\nYou may say, \"That's not for touching,\" and your child looks straight at you… and touches it anyway. It can feel provocative. But developmentally, this is exploration — not defiance.",
        sections: [
          {
            label: 'Understanding the Behaviour',
            points: [
              'The brain systems responsible for "inhibitory control" (the ability to stop an impulse) are still immature. The prefrontal cortex develops gradually throughout early childhood.',
              'Your toddler wants things immediately, struggles to delay gratification, tests cause and effect, and seeks predictability.',
              'They may insist on drinking from one specific cup, wearing sandals on a cold day, or following a rigid routine. This need for sameness reflects a search for security.',
              'Research shows that young children rely on external regulation (the adult\'s calm nervous system) before they can develop internal regulation of their own.',
            ],
          },
          {
            label: 'How to Respond',
            points: [
              'Avoid unnecessary confrontation at this stage. If the behaviour is minor and safe, calmly redirect or briefly ignore it rather than turning it into a power struggle.',
              'Keep your tone steady. Offer limited choices ("This cup or that one?").',
              'Gently remove unsafe objects without emotional escalation. Maintain physical closeness.',
            ],
          },
          {
            label: 'The Power of Affection',
            points: [
              'During moments of resistance, what helps most is warm physical contact, eye-level communication, gentle touch, and a calm voice.',
              'Physical affection supports oxytocin release (the "bonding hormone"), which reduces stress and increases emotional security.',
              'Your calm becomes their template.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Keep routines predictable.',
            'Reduce overstimulation (too many toys, screens, loud noise increase impulsivity).',
            'Create clear physical boundaries in the home environment rather than relying only on verbal limits.',
          ],
        },
        neurodevelopmentalNote:
          'Self-control is not yet internal at this age — it is co-regulated. Emotional maturity grows slowly but steadily. Choosing connection over confrontation builds the architecture of self-regulation.',
        weeklyCta:
          'Practise one calm redirection per day instead of immediate correction. Observe how your child responds when your nervous system stays regulated.',
      },
    ],
    closingNote:
      'Month 17 has been about finding voice, expressing creativity, building strength, and navigating the first real emotional boundaries. Your toddler is not defiant — they are developing. Every calm response you offer is building the neural architecture of self-regulation.',
  },
  // ─── MONTH 18 ───
  {
    month: 18,
    title: 'Month 18',
    subtitle: 'Memory, building, and hands-on discovery',
    weeks: [
      {
        week: 1,
        title: 'Cognitive Development and Active Play',
        gentleFocus: 'Object permanence, memory, and movement as regulation',
        iconName: 'brain',
        introduction:
          "At eighteen months, your toddler has developed stronger object permanence — the understanding that something continues to exist even when it is no longer visible. This is an important cognitive milestone linked to memory development and mental representation.",
        sections: [
          {
            label: 'Hide-and-Seek with Objects',
            points: [
              'Take advantage of this new ability by playing hide-and-seek with a favourite toy.',
              'Hide it partially at first, then fully out of sight, and encourage your child to find it.',
              'This strengthens working memory, problem-solving skills, attention, and early logical reasoning.',
              'You can increase the challenge gradually by hiding the toy in more complex locations.',
              'Pause and allow your child time to think before helping.',
            ],
          },
          {
            label: 'High Energy? Use Music and Movement',
            points: [
              'If your child\'s energy levels are high, put on lively songs and invent simple dance moves to copy and repeat.',
              'Encourage jumping, clapping, spinning, stomping, and marching.',
              'This strengthens motor coordination, rhythm processing, bilateral integration, and auditory–motor connection.',
              'Research suggests that rhythmic movement supports neural timing and coordination across brain regions involved in attention and language.',
              'Movement is regulation. Physical activity helps discharge excess energy and reduces restlessness.',
              'Avoid high-energy play shortly before bedtime, as it may increase arousal rather than promote calm.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose music without overstimulating electronic effects.',
            'Keep volume moderate to protect auditory development.',
            'Prefer open spaces free of obstacles to reduce accident risk.',
          ],
        },
        neurodevelopmentalNote:
          'At eighteen months, your toddler is learning that the world continues — even when it disappears from view. And that their body is a powerful tool for exploring it. An active body often leads to a calmer nervous system — when well timed.',
        weeklyCta:
          'Play object hide-and-seek at least three times this week, slowly increasing difficulty. Introduce one structured "dance break" per day, ideally earlier in the afternoon.',
      },
      {
        week: 2,
        title: 'Constructive Play and Early Quantity Awareness',
        gentleFocus: 'Building with blocks and introducing early mathematical concepts',
        iconName: 'sparkles',
        introduction:
          "At eighteen months, toddlers are ready for more complex building experiences. Their growing fine motor control and spatial understanding allow them to experiment with stacking, connecting and organising objects with greater intention.",
        sections: [
          {
            label: 'Cognitive Development – Building with Blocks',
            points: [
              'With large building blocks, creativity truly has no limits. Build, stack and explore endless construction possibilities.',
              'Designed for small hands, these blocks connect and separate easily, allowing your child to develop "fine motor skills", strengthen hand muscles, improve hand–eye coordination, explore early engineering thinking, and practise problem-solving through trial and error.',
              'Open-ended construction play supports "divergent thinking" (the ability to generate multiple ideas or solutions), a foundational skill for creativity later in life.',
              'Allow plenty of free play without giving too many instructions. The goal is exploration, not perfection.',
            ],
          },
          {
            label: 'Expanding Quantity and Size Concepts',
            points: [
              'Offer a geometric stacking pyramid with animal shapes or rainbow-coloured rings.',
              'This supports visual discrimination, understanding of "bigger" and "smaller", early quantity awareness, colour recognition, and spatial reasoning.',
              'Gently narrate concepts: "This one is bigger." "Let\'s find the smallest piece." "How many blocks do we have?"',
              'Research suggests that hands-on manipulation of size and quantity strengthens the parietal brain regions associated with later mathematical processing.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose large, safe blocks made from non-toxic materials.',
            'Prefer durable, sustainable options where possible.',
            'Avoid electronic building toys that replace active thinking with passive stimulation.',
          ],
        },
        neurodevelopmentalNote:
          'When the tower falls, learning happens. When they rebuild it, growth happens. At eighteen months, your toddler is not just stacking blocks — they are stacking neural connections.',
        weeklyCta:
          'Offer daily block-building time this week. During play, introduce simple comparative language once per session — bigger, smaller, tall, short, more, less.',
      },
      {
        week: 3,
        title: 'Motor Exploration and Hands-On Discovery',
        gentleFocus: 'Fine motor coordination, cause-and-effect, and containment play',
        iconName: 'hand',
        introduction:
          "This week focuses on activities that stimulate fine motor coordination, problem-solving and sensory curiosity. At eighteen months, exploration is driven by curiosity, not defiance. Pressing every button is not mischief — it is experimentation.",
        sections: [
          {
            label: 'Motor Development – Exploration Through the Hands',
            points: [
              'Highly attractive activities at this stage include finger painting, colouring with chunky crayons, building towers, open-and-close toys, and pressing buttons.',
              'Your child is refining "fine motor control" and strengthening "cause-and-effect reasoning".',
              'Even pressing a button supports finger isolation, hand strength, anticipation, and cognitive sequencing.',
              'If you have an old telephone or remote control that no longer works, it can be offered as a toy — always check for loose or small parts that could pose a choking risk.',
            ],
          },
          {
            label: 'The Fascination with Containment',
            points: [
              'Putting one object inside another is particularly captivating at this stage.',
              'This strengthens spatial reasoning, size discrimination, logical categorisation, and bilateral coordination.',
              'Wooden puzzles are especially beneficial now — they encourage problem-solving, shape recognition, concentration, and hand–eye coordination.',
              'Look for simple wooden puzzles with large knobs or chunky pieces suited to small hands.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose non-toxic, washable paints and crayons.',
            'Prefer wooden, bioplastic or durable materials over overstimulating electronic toys.',
            'Keep the environment organised but accessible to encourage safe independence.',
          ],
        },
        neurodevelopmentalNote:
          'Hands lead. Curiosity guides. The brain follows. At eighteen months, every small movement is wiring the future.',
        weeklyCta:
          'Offer one sensory-based hand activity daily this week. Introduce one "in-and-out" or fitting activity. Allow time for repetition — repetition builds mastery.',
      },
      {
        week: 4,
        title: 'Precision, Coordination and Early Logical Sorting',
        gentleFocus: 'Cutting play and geometric sorting for coordination and reasoning',
        iconName: 'brain',
        introduction:
          "At eighteen months, toddlers are refining hand control and beginning to imitate real-life actions with intention. This week focuses on cutting play and geometric sorting to strengthen coordination and early reasoning skills.",
        sections: [
          {
            label: 'Motor Development – Wooden Cutting Toy',
            points: [
              'A wooden cutting food set is an excellent activity at this stage. Your child can fit the vegetable pieces together and "cut" them using a child-safe wooden knife.',
              'The Velcro fastening provides just enough resistance for your toddler to feel as though they are genuinely cutting — highly satisfying and developmentally beneficial.',
              'This supports fine motor coordination, grip strength, bilateral coordination (one hand stabilises while the other cuts), concentration, and "motor planning".',
              'Imitating everyday tasks also strengthens symbolic thinking and independence.',
            ],
          },
          {
            label: 'Cognitive & Motor Integration – Geometric Sorting Tower',
            points: [
              'A geometric stacking board with four vertical pegs and colourful shapes (circles, rectangles, triangles, squares) is ideal at this age.',
              'This helps your child recognise geometric shapes, differentiate sizes, match colours, develop logical sequencing, and strengthen fine motor precision.',
              'Placing shapes correctly requires visual discrimination and problem-solving. If the shape does not fit, your toddler must rotate or adjust it — an early form of spatial reasoning.',
              'Research suggests that hands-on shape sorting supports neural pathways linked to later mathematical and analytical thinking.',
            ],
          },
        ],
        extraGuidance: {
          title: 'Neuroenvironmental Guidance – The Seahorse Way',
          points: [
            'Choose wooden toys with non-toxic finishes.',
            'Avoid overly electronic versions that reduce active problem-solving.',
            'Ensure pieces are large enough to prevent choking hazards.',
          ],
        },
        neurodevelopmentalNote:
          'At eighteen months, mastering tasks builds confidence. When your toddler successfully "cuts" a vegetable or fits a shape correctly, they experience competence — a powerful driver of self-esteem. Your toddler is not just playing — they are rehearsing life.',
        weeklyCta:
          'Offer supervised cutting play two to three times this week. Introduce simple prompts during geometric play: "Where does the triangle go?" "Can you find the biggest piece?" Keep language gentle and playful.',
      },
    ],
    closingNote:
      'Month 18 marks the halfway point of the second year. Your toddler is building memory, constructing with intention, exploring with their hands, and refining precision. Every block stacked, every shape sorted, every button pressed is wiring the neural architecture for learning, creativity, and confidence.',
  },
];
