import InfoTooltip from "./components/InfoTooltip";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Bell,
  X,
  Gem,
  ListChecks,
  Search,
  Coins,
  LayoutDashboard,
  Wallet,
  Gift,
  TrendingUp,
  ArrowLeftRight,
  Users,
  History,
  CircleHelp,
} from "lucide-react";

import { exchangeOptions } from "./data/exchangeData";
import styles from "./App.module.css";

const formatNumber = (number) => number.toLocaleString("en-IN");

export default function App() {
  const [balance, setBalance] = useState({
    gems: 420,
    ves: 3850,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [conversionState, setConversionState] = useState("review");
  const [history, setHistory] = useState([]);
  const [dataState, setDataState] = useState("ready");
  
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const processingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedOption) {
      dialogRef.current?.showModal();
    }
  }, [selectedOption]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  function openConversion(option, event) {
    triggerRef.current = event.currentTarget;
    setConversionState("review");
    setSelectedOption(option);
  }

  function closeConversion() {
    if (processingRef.current) return;

    dialogRef.current?.close();
    setSelectedOption(null);
    triggerRef.current?.focus();
  }

  function confirmConversion() {
    if (
      processingRef.current ||
      !selectedOption ||
      balance.gems < selectedOption.requiredGems
    ) {
      return;
    }

    processingRef.current = true;
    setConversionState("processing");

    const option = selectedOption;

    timerRef.current = window.setTimeout(() => {
      setBalance((currentBalance) => ({
        gems: currentBalance.gems - option.requiredGems,
        ves: currentBalance.ves + option.receiveVEs,
      }));

      setHistory((previousHistory) => [
  {
    id: crypto.randomUUID(),
    gems: option.requiredGems,
    image: option.image,
    ves: option.receiveVEs,
    time: new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...previousHistory,
]);
      processingRef.current = false;
      setConversionState("success");
    }, 1200);
  }

  const insufficientGems =
    selectedOption &&
    balance.gems < selectedOption.requiredGems;

  const isProcessing = conversionState === "processing";
  const isSuccess = conversionState === "success";

  return (
    <main className={styles.page}>
      <aside className={styles.dashboardSidebar}>
  <a href="#overview" className={styles.sidebarBrand}>
    <span aria-hidden="true">V</span>
    <div>VELOOP <small>REWARDS</small></div>
  </a>

  <nav aria-label="Rewards navigation" className={styles.sidebarNav}>
  <a href="#overview">
    <LayoutDashboard size={19} aria-hidden="true" />
    Dashboard
  </a>

  <a href="#balances">
    <Wallet size={19} aria-hidden="true" />
    Wallet
  </a>

  <a href="#conversions">
    <Gift size={19} aria-hidden="true" />
    Rewards
  </a>

  <a href="#how-exchange-works">
    <TrendingUp size={19} aria-hidden="true" />
    Level Up &amp; Earn
  </a>

  <a href="#conversions" className={styles.sidebarActive}>
    <ArrowLeftRight size={19} aria-hidden="true" />
    Exchange Center
  </a>

  <a href="#referrals">
    <Users size={19} aria-hidden="true" />
    Referrals
  </a>

  <a href="#history">
    <History size={19} aria-hidden="true" />
    History
  </a>

  <a href="#support">
    <CircleHelp size={19} aria-hidden="true" />
    Support
  </a>
    <div className={styles.menuAccount}>
  <span className={styles.profileAvatar}>H</span>

  <div>
    <small>Hello,</small>
    <strong>Haseen</strong>
    <span className={styles.accountLevel}>Level 7</span>
  </div>

  <small className={styles.accountId}>Veloop ID: 78459</small>
</div>

<div className={styles.menuEarnCard}>
  <h3>Earn More Gems!</h3>
  <p>Complete tasks, refer friends and unlock more ways to earn Gems.</p>

  <Gem size={64} aria-hidden="true" />

  <a href="#conversions">Explore Now</a>
</div>
   </nav>   

</aside>
      <header id="overview" className={styles.header}>
  <a href="#overview" className={styles.brand}>
    VELOOP <span>REWARDS</span>
  </a>

  <details className={styles.mobileMenu}>
    <summary aria-label="Navigation menu">☰</summary>

    <nav
      aria-label="Mobile rewards navigation"
      onClick={(event) => {
        if (event.target.closest("a")) {
          event.currentTarget.closest("details").open = false;
        }
      }}
    >

      <button
  type="button"
  className={styles.drawerClose}
  aria-label="Close navigation"
  onClick={(event) => {
    event.currentTarget.closest("details").open = false;
  }}
>
  ×
</button>


     <div className={styles.drawerBrand}>
  <span
    className={styles.referenceLogo}
    role="img"
    aria-label="VELOOP Rewards"
  />
</div>

<a href="#overview">
  <LayoutDashboard size={19} aria-hidden="true" />
  Dashboard
</a>

<a href="#balances">
  <Wallet size={19} aria-hidden="true" />
  Wallet
</a>

<a href="#conversions">
  <Gift size={19} aria-hidden="true" />
  Rewards
</a>

<a href="#how-exchange-works">
  <TrendingUp size={19} aria-hidden="true" />
  Level Up &amp; Earn
</a>

<a href="#conversions">
  <ArrowLeftRight size={19} aria-hidden="true" />
  Exchange Center
</a>

<a href="#referrals">
  <Users size={19} aria-hidden="true" />
  Referrals
</a>

<a href="#history">
  <History size={19} aria-hidden="true" />
  History
</a>

<a href="#rules">
  <ShieldCheck size={19} aria-hidden="true" />
  Exchange Rules
</a>

<a href="#support">
  <CircleHelp size={19} aria-hidden="true" />
  Support
</a>
<div className={styles.menuAccount}>
  <span className={styles.profileAvatar}>H</span>
  <div>
    <small>Hello,</small>
    <strong>Haseen</strong>
    <span className={styles.accountLevel}>Level 7</span>
  </div>
  <small className={styles.accountId}>Veloop ID: 78459</small>
</div>

<div className={styles.menuEarnCard}>
  <h3>Earn More Gems!</h3>
  <p>
    Complete tasks, refer friends and unlock more ways to earn Gems.
  </p>
  <Gem size={64} aria-hidden="true" />
  <a href="#conversions">Explore Now</a>
</div>
</nav>
</details>

     <div className={styles.headerActions}>
     <div className={styles.topBalances}>
  <a href="#balances" className={styles.topBalance}>
   <img
  src="/Image/ChatGPT Image Sep 10, 2026, 06_44_12 PM.png"
  className={styles.topGemImage}
  alt=""
/>
      <span>
      <strong>{formatNumber(balance.gems)}</strong>
      <small>Gems</small>
    </span>
  </a>

  <a href="#balances" className={styles.topBalance}>
    <span className={styles.topCoin} aria-hidden="true">VE</span>
    <span>
      <strong>{formatNumber(balance.ves)}</strong>
      <small>VEs</small>
    </span>
  </a>
</div>
  <span className={styles.secureLabel}>
    <ShieldCheck size={15} aria-hidden="true" />
    Secure reward conversion
  </span>


  <details className={styles.notificationMenu}>
    <summary aria-label="Notifications">
      <Bell size={19} aria-hidden="true" />
    </summary>

    <div className={styles.notificationPanel}>
      <strong>Notifications</strong>
      <p>No new notifications.</p>
    </div>
  </details>

  <span className={styles.headerAvatar} aria-label="Haseen, demo profile">
    H
  </span>
</div>

</header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>YOUR EFFORT, REWARDED</p>

          <h1>
          	Exchange Center
            <br />
            <span>	Turn Your Earned Gems into VEs</span>
          </h1>

          <p className={styles.description}>
          Convert your eligible Gems into VEs and continue your reward journey.
          </p>

          <a href="#conversions" className={styles.heroButton}>
            Explore your rewards
            <ArrowDown size={17} />
          </a>

          <p className={styles.trust}>
            <ShieldCheck size={16} />
            Clear conversions. You stay in control.
          </p>
        </div>
 
        <div
  className={styles.rewardVisual}
  role="img"
  aria-label="Purple Gems convert into gold VE coins"
>
  <div className={styles.rewardOrbit} />

  <img
  src="/Image/ChatGPT Image Sep 10, 2026, 06_44_12 PM.png"
  className={styles.heroGemImage}
  alt=""
/>

  <div className={styles.rewardArrow} aria-hidden="true">
    ····· →
  </div>

  <div className={styles.rewardCoin}>
    <span>VE</span>
  </div>

  <span className={styles.rewardSparkle} aria-hidden="true">
    ✦
  </span>
</div>

      </section>

      <section
        id="balances"
        className={styles.balanceGrid}
        aria-label="Your reward balances"
      >
        <article className={styles.balanceCard}>
          <img
            src="/Image/ChatGPT Image Sep 10, 2026, 06_44_12 PM.png"
            className={`${styles.balanceArtwork} ${styles.balanceGemImage}`}
            alt=""
          />
        
         <p>
  Available Gems
  <InfoTooltip label="What are Gems?">
    Gems are reward credits earned through eligible activities
    on VELOOP Rewards.
  </InfoTooltip>
</p>

          <h2>
            {formatNumber(balance.gems)} <span>Gems</span>
          </h2>

          <small>	Your Reward Gems</small>
        </article>

        <article className={styles.balanceCard}>
          <img
    className={styles.balanceArtwork}
    src="/Image/ChatGPT Image Sep 10, 2026, 06_34_48 PM.png"
    alt=""
  />
         <p>
  	Available VEs
  <InfoTooltip label="What are VEs?">
    VEs are VELOOP Rewards' virtual reward currency for eligible
    redemption options. Platform rules apply.
  </InfoTooltip>
</p>

          <h2>
            {formatNumber(balance.ves)} <span>VEs</span>
          </h2>

          <small>Your VE Balance</small>
        </article>
      </section>

      <section className={styles.rewardInfo}>
  <h2>What are these?</h2>

  <div className={styles.rewardInfoRow}>
    <img
      src="/Image/ChatGPT Image Sep 10, 2026, 06_44_12 PM.png"
      alt=""
    />
    <div>
      <h3>Gems</h3>
      <p>
        Gems are reward credits earned through eligible
        activities on VELOOP Rewards.
      </p>
    </div>
  </div>

  <div className={styles.rewardInfoRow}>
    <img
      src="/Image/ChatGPT Image Sep 10, 2026, 06_34_48 PM.png"
      alt=""
    />
    <div>
      <h3>VEs</h3>
      <p>
        VEs are VELOOP Rewards’ virtual reward currency for
        eligible redemption options. Platform rules apply.
      </p>
    </div>
  </div>

  <a href="#rules">View All Rules →</a>
</section>

      <section
        id="conversions"
        className={styles.conversionSection}
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>
              MAKE YOUR GEMS GO FURTHER
            </p>
           <h2>
  	Available Conversions
  <InfoTooltip label="How are conversion values decided?">
    Conversion values are predefined by VELOOP Rewards.
    Review the required Gems and VEs received before confirming.
  </InfoTooltip>
</h2>
            <p>confirming.	Choose a conversion that works best for you.</p>
          </div>

         <span
  className={styles.optionCount}
  hidden={dataState === "loading" || dataState === "error"}
>
  {dataState === "ready"
    ? `${exchangeOptions.length} options`
    : dataState === "empty"
      ? "0 options"
      : null}
</span>
</div>

        <div className={styles.previewControls}>
  <label htmlFor="preview-state">Preview state: </label>
  <select
    id="preview-state"
    value={dataState}
    onChange={(event) => setDataState(event.target.value)}
  >
    <option value="ready">Available conversions</option>
    <option value="loading">Loading</option>
    <option value="empty">No conversions</option>
    <option value="error">Error</option>
  </select>
</div>

          {dataState === "loading" && (
  <div className={styles.dataState} role="status">
    <span className={styles.loadingGem} aria-hidden="true">✦</span>
    <h3>Preparing your reward conversions…</h3>
    <p>Your next reward moment is on its way.</p>
  </div>
)}

{dataState === "empty" && (
  <div className={styles.dataState} role="status">
    <span className={styles.stateSymbol} aria-hidden="true">◇</span>
    <h3>No conversions available right now.</h3>
    <p>New reward conversion opportunities will appear here when available.</p>
  </div>
)}

{dataState === "error" && (
  <div className={styles.dataState} role="alert">
    <h3>Unable to load exchange options.</h3>
    <p>Please try again.</p>

    <button
      type="button"
      className={styles.retryButton}
      onClick={() => setDataState("ready")}
    >
      Retry
    </button>
  </div>
)}

<div
  className={styles.conversionGrid}
  hidden={dataState !== "ready"}
>
          {exchangeOptions.map((option) => {
            const canConvert =
              balance.gems >= option.requiredGems;

            return (
              <article
                key={option.id}
                className={styles.conversionCard}
              >
                   
                {(option.requiredGems === 28 || option.requiredGems === 39) && (
  <span className={styles.popularBadge}>Popular</span>
)}

                <div className={styles.cardArtwork}>
  <img
    src={option.image}
    alt=""
    className={styles.cardGemImage}
    loading="lazy"
  />

  <ArrowRight size={18} aria-hidden="true" />

  <img
    src="/Image/ChatGPT Image Sep 10, 2026, 06_34_48 PM.png"
    alt=""
    className={styles.cardCoinImage}
    loading="lazy"
  />
</div>

                <h3>{option.name}</h3>
                <p>Turn your earned Gems into your next reward.</p>

                <div className={styles.conversionValues}>
                  <div>
                    <small>YOU CONVERT</small>
                    <strong>{option.requiredGems}</strong>
                    <span>Gems</span>
                  </div>

                  <ArrowRight size={21} aria-hidden="true" />

                  <div>
                    <small>YOU RECEIVE</small>
                    <strong>{option.receiveVEs}</strong>
                    <span>VEs</span>
                  </div>
                </div>

                {!canConvert && (
                  <p className={styles.insufficientText}>
                    You need{" "}
                    {option.requiredGems - balance.gems} more Gems.
                  </p>
                )}

                <button
                  type="button"
                  className={styles.convertButton}
                  onClick={(event) =>
                    openConversion(option, event)
                  }
                  data-convert-reward={canConvert ? "" : undefined}
                >
                  {canConvert
                    ? "Convert Rewards"
                    : "Earn more Gems"}

                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.rewardBanner}>
  <div>
    <h2>The more Gems you have, the better the rewards you unlock!</h2>
    <p>Keep earning and keep growing.</p>
  </div>

  <img
    src="/Image/reward-chest.png"
    alt=""
    loading="lazy"
  />
</section>
      
      <section className={styles.howSection}>
  <h2>How Exchange Works</h2>
  <p>From earned Gems to your next reward, in five simple steps.</p>

  <div className={styles.stepsGrid}>
    {[
      ["Earn Gems", "Complete eligible VELOOP activities."],
      ["Choose conversion", "Select an available reward option."],
      ["Review exchange", "Check the Gems required and VEs received."],
      ["Confirm", "Approve the conversion when you are ready."],
      ["Receive VEs", "Your balance updates after success."],
    ].map(([title, description], index) => (
      <article className={styles.stepCard} key={title}>
       
      <span
  className={`${styles.workIcon} styles.workIcon`}
  data-step={index}
  aria-hidden="true"
>
  {index === 0 && <Gem size={28} />}
  {index === 1 && <ListChecks size={28} />}
  {index === 2 && <Search size={28} />}
  {index === 3 && <ShieldCheck size={28} />}
  {index === 4 && <Coins size={28} />}
</span>



<small className={styles.stepCaption}>
  {String(index + 1).padStart(2, "0")}
</small>
        <h3>{title}</h3>
        <p>{description}</p>
      </article>
    ))}
  </div>
</section>

      <section className={styles.historySection}>
  <h2>Recent Conversions</h2>
  <p>Your latest reward moments, all in one place.</p>

  <div className={styles.historyList} aria-live="polite">
    {history.length === 0 ? (
      <p className={styles.emptyHistory}>
        No conversions yet. Your first conversion will appear here.
      </p>
    ) : (
      history.slice(0, 5).map((item) => (
       <div className={styles.historyItem} key={item.id}>
  <div className={styles.historyArtwork} aria-hidden="true">
    <img
      src={
        exchangeOptions.find(
          (option) => option.requiredGems === item.gems
        )?.image ||
        "/Image/ChatGPT Image Sep 10, 2026, 06_44_12 PM.png"
      }
      alt=""
    />

    <ArrowRight size={14} />

    <img
      src="/Image/ChatGPT Image Sep 10, 2026, 06_34_48 PM.png"
      alt=""
    />
  </div>

  <div>
    <strong>
      {item.gems} Gems → {item.ves} VEs
    </strong>
    <small>Today, {item.time}</small>
  </div>

          <span className={styles.historyStatus}>
            <CheckCircle2 size={14} />
            Completed
          </span>
        </div>
      ))
    )}
  </div>
</section>
      
    <section
  id="rules"
  className={`${styles.rulesSection} ${styles.rulesWithArtwork}`}
>
  <img
    className={styles.rulesShield}
    src="/Image/rules-shield.png"
    alt=""
    loading="lazy"
  />

  <h2>
    <ShieldCheck size={22} />
    Exchange Rules


    <InfoTooltip label="About exchange rules">
    Only eligible Gems can be converted. Available options and
    eligibility are subject to VELOOP Rewards platform rules.
  </InfoTooltip>
  </h2>

  <ul>
    <li>Only eligible Gems can be exchanged.</li>
    <li>Exchange values are predefined by VELOOP Rewards.</li>
    <li>Available conversion options may vary.</li>
    <li>Your balance updates after a successful conversion.</li>
    <li>A successful conversion cannot be duplicated.</li>
    <li>VELOOP Rewards platform rules apply.</li>
  </ul>
</section>

     <section
  id="support"
  className={styles.supportPanel}
  aria-labelledby="support-title"
>
  <div className={styles.supportBox}>
    <a
      href="#overview"
      className={styles.supportClose}
      aria-label="Close support"
    >
      ×
    </a>

    <h2 id="support-title">Support</h2>

    <p>
      Need help with a conversion? Check your recent
      conversions or review the exchange rules.
    </p>

    <a href="#history">View recent conversions</a>
    <a href="#rules">Read exchange rules</a>
  </div>
</section>
     


      <dialog
        ref={dialogRef}
        className={styles.modal}
        aria-labelledby="conversion-title"
        aria-describedby="conversion-description"
        onCancel={(event) => {
          event.preventDefault();
          closeConversion();
        }}
      >
        {selectedOption && (
          <>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeConversion}
              disabled={isProcessing}
              aria-label="Close conversion"
              autoFocus
            >
              <X size={21} />
            </button>

            <div className={styles.modalSymbol}>
              {isSuccess ? (
                <CheckCircle2 size={32} />
              ) : (
                <ShieldCheck size={32} />
              )}
            </div>

            <div aria-live="polite" aria-atomic="true">
              <h2 id="conversion-title">
                {isSuccess
                  ? "Conversion complete!"
                  : insufficientGems
                    ? "A few more Gems to go"
                    : isProcessing
                      ? "Converting your rewards…"
                      : "Confirm your conversion"}
              </h2>

              <p id="conversion-description">
                {isSuccess
                  ? `${selectedOption.receiveVEs} VEs have been added to your demo balance.`
                  : insufficientGems
                    ? `Earn ${
                        selectedOption.requiredGems - balance.gems
                      } more Gems through eligible VELOOP activities, then return to convert.`
                    : "Check the amounts below before you confirm."}
              </p>
            </div>

            <div className={styles.modalConversion}>
              <strong>
                {selectedOption.requiredGems}
                <span>Gems</span>
              </strong>

              <ArrowRight size={24} aria-hidden="true" />

              <strong>
                {selectedOption.receiveVEs}
                <span>VEs</span>
              </strong>
            </div>

            {!insufficientGems && (
              <div className={styles.balancePreview}>
                <p>
                  {isSuccess
                    ? "Available Gems"
                    : "Gems after conversion"}

                  <strong>
                    {formatNumber(
                      isSuccess
                        ? balance.gems
                        : balance.gems -
                            selectedOption.requiredGems
                    )}
                  </strong>
                </p>

                <p>
                  {isSuccess
                    ? "	Available VEs"
                    : "VEs after conversion"}

                  <strong>
                    {formatNumber(
                      isSuccess
                        ? balance.ves
                        : balance.ves +
                            selectedOption.receiveVEs
                    )}
                  </strong>
                </p>
              </div>
            )}

            <div className={styles.modalActions}>
              {isSuccess || insufficientGems ? (
                <button
                  type="button"
                  className={styles.convertButton}
                  onClick={closeConversion}
                >
                  {isSuccess ? "Continue" : "Got it"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={closeConversion}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className={styles.convertButton}
                    onClick={confirmConversion}
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Converting…"
                      : "Confirm conversion"}
                  </button>
                </>
              )}
            </div>

            <small className={styles.demoNote}>
              Demo rewards only. No real transaction.
            </small>
          </>
        )}
      </dialog>
    </main>
  );
}