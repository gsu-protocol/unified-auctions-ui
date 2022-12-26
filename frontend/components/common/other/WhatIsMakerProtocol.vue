<template>
    <TextBlock title="What is the GSU Protocol?">
        The GSU Protocol is
        <Explain text="a set of rules">
            a <a href="https://changelog.makerdao.com/" target="_blank">set of smart contracts</a> running on the
            Ethereum blockchain
        </Explain>
        that defines how a cryptocurrency called GSUc is kept approximately equal to USD by incentivizing market
        players. People who help to keep GSUc stable, benefit from their actions by acquiring cryptocurrency at a
        discount. The main promise of the protocol is to provide a decentralized
        <Explain text="stable currency">
            <a href="https://makerdao.com/en/whitepaper#the-dai-stablecoin" target="_blank">The GSUc Stablecoin</a>
            is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar </Explain
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
