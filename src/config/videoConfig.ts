export interface VideoChoice {
  text: string;
  nextVideoId: string;
}

export interface VideoNode {
  id: string;
  url: string;
  question?: string;
  choices?: VideoChoice[];
}

export const videoConfig: Record<string, VideoNode> = {
  intro: {
    id: 'intro',
    url: 'https://videochat.strongprompt.ai/introvideo.mp4',
    question: 'What would you like to learn more about?',
    choices: [
      {
        text: 'Product Features',
        nextVideoId: 'features',
      },
      {
        text: 'Pricing Plans',
        nextVideoId: 'pricing',
      },
      {
        text: 'Customer Success Stories',
        nextVideoId: 'success',
      },
    ],
  },
  features: {
    id: 'features',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    question: 'Which feature interests you most?',
    choices: [
      {
        text: 'Integration Capabilities',
        nextVideoId: 'integration',
      },
      {
        text: 'Back to Overview',
        nextVideoId: 'intro',
      },
    ],
  },
  pricing: {
    id: 'pricing',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  success: {
    id: 'success',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  integration: {
    id: 'integration',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
};
