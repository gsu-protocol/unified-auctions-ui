<template>
    <TextBlock title="What is the GSU Protocol?">
        The GSU Protocol is
        <Explain text="a set of rules"> a set of smart contracts running on the Ethereum blockchain </Explain>
        that defines how a cryptocurrency called GSUc is kept approximately equal to GSU exchange rate by incentivizing
        market players. People who help to keep GSUc stable, benefit from their actions by acquiring cryptocurrency at
        a discount. The main promise of the protocol is to provide a decentralized
        <Explain text="stable currency">
            The GSUc Stablecoin is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the GSU
            exchange rate.</Explain
        >, which can be used to borrow money over a longer period without being affected by unpredictable exchange
        rates.
    </TextBlock>
</template>

<script lang="ts">
import Vue from 'vue';
import TextBlock from '~/components/common/other/TextBlock.vue';
import Explain from '~/components/common/other/Explain.vue';

export default Vue.extend({
    components: {
        TextBlock,
        Explain,
    },
});
</script>
