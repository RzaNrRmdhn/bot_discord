import sendWarning from './sendWarning.js';
import handleCreateChannel from './createChannel.js';
import handleOnboarding from './onboarding.js';
import handleListWord from './createListWord.js';
import handleSendMessages from './sendMessages.js';
import handleNotifOpenChat from './sendNotifOpenChat.js';
import handleSuggestorReport from './sendSuggestorReport.js';
import handleSetupMessagePanel from './setupMessagesPanel.js';
import handleMuteTags from './muteTagsEveryone.js';

export default [
    {
        event: 'messageCreate',
        handler: sendWarning,
    },
    {
        event: 'channelCreate',
        handler: handleCreateChannel,
    },
    {
        event: 'guildMemberAdd',
        handler: handleOnboarding,
    },
    {
        event: 'interactionCreate',
        handler: handleListWord,
    },
    {
        event: 'interactionCreate',
        handler: handleSendMessages,
    },
    {
        event: 'voiceStateUpdate',
        handler: handleNotifOpenChat,
    },
    {
        event: 'interactionCreate',
        handler: handleSuggestorReport,
    },
    {
        event: 'messageCreate',
        handler: handleSetupMessagePanel,
    },
    {
        event: 'messageCreate',
        handler: handleMuteTags,
    }
]