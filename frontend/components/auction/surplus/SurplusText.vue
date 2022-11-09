<template>
    <div class="flex flex-col space-y-8 py-8">
        <WhatIsMakerProtocol v-if="isExplanationsShown" class="TextBlock"></WhatIsMakerProtocol>
        <TextBlock v-if="isExplanationsShown" title="What are surplus auctions?" class="TextBlock">
            A
            <Explain text="surplus auction"
                >In GSU protocol terms, surplus auctions are called In GSU Protocol terms, surplus auctions are called
                flap auctions and are operated via the flap.sol contract</Explain
            >
            is the process of stabilizing GSUc price, where excessive GSUc tokens are auctioned off for the
            <Explain text="GSUp tokens">
                GSU Protocol governance tokens that can be used to vote within GSU Protocol and whose price
                algorithmically depends on the stability and prosperity of the GSU Protocol ecosystem </Explain
            >. The GSUp obtained by the protocol is then automatically burned, reducing overall GSUp supply and
            therefore increasing its price.
        </TextBlock>
        <TextBlock v-if="isExplanationsShown" title="Why would I participate?" class="TextBlock">
            Your participation can yield a profit by leveraging price differences between the auction price from the
            GSU Protocol and the price on other marketplaces. Similar to an English-style auction system, bidders
            compete with increasing amounts of GSUp on the fixed amount of auctioned GSUc. Once the auction has ended,
            the GSUc auctioned off can be collected by the highest bidder. As long as the auction price is below the
            exchange rate on other marketplaces there is a chance to make a profit.
        </TextBlock>
        <div
            class="w-full self-center"
            :class="{ 'max-w-4xl': isExplanationsShown, 'md:px-10': !isExplanationsShown }"
        >
            <SurplusAuctionsTable
                class="block overflow-x-auto"
                :auctions="auctions"
                :selected-auction-id.sync="selectedAuctionId"
                :show-more-rows="!isExplanationsShown"
                :is-loading="areAuctionsFetching"
                :last-updated="lastUpdated"
                :error="auctionsError"
            />
        </div>
        <WhatIsCatch v-if="isExplanationsShown" class="TextBlock"></WhatIsCatch>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SurplusAuctionTransaction } from 'auctions-core/src/types';
import SurplusAuctionsTable from '~/components/auction/surplus/SurplusAuctionsTable.vue';
import WhatIsMakerProtocol from '~/components/common/other/WhatIsMakerProtocol.vue';
import WhatIsCatch from '~/components/common/other/WhatIsCatch.vue';
import TextBlock from '~/components/common/other/TextBlock.vue';
import Explain from '~/components/common/other/Explain.vue';

export default Vue.extend({
    components: {
        SurplusAuctionsTable,
        WhatIsMakerProtocol,
        WhatIsCatch,
        TextBlock,
        Explain,
    },
    props: {
        auctions: {
            type: Array as PropType<SurplusAuctionTransaction[]>,
            default: () => [],
        },
        areAuctionsFetching: {
            type: Boolean,
            default: false,
        },
        auctionsError: {
            type: String,
            default: null,
        },
        selectedAuctionId: {
            type: Number,
            default: null,
        },
        isExplanationsShown: {
            type: Boolean,
            default: true,
        },
        lastUpdated: {
            type: Date,
            default: null,
        },
    },
});
</script>

<style scoped>
.TextBlock {
    @apply max-w-screen-sm self-center;
}
</style>
