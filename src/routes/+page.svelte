<script lang="ts">
	import * as Heading from '@/components/heading';
	import * as Section from '@/components/section';
</script>

<Heading.Heading text="MadKarma">
	{#snippet links()}
		<Heading.Link text="Blog" href="/blog" decor />
		<Heading.Link text="GitHub" href="https://github.com/madkarmaa" decor />
	{/snippet}
</Heading.Heading>

<Section.Container>
	<Section.Item title="About Me" image="/img/me.png">
		Hi, I'm <strong>Allen</strong> (also known as <i>MadKarma</i> on the internet). At 19, I'm a passionate
		and driven individual with a purposeful approach to technology and software development. Programming
		is more than just a skill for me; it's a genuine passion that fuels my desire to continuously learn
		and improve. I thrive on challenges and I'm a fast learner, especially when it comes to topics I
		enjoy, consistently seeking opportunities to expand my skillset and create meaningful projects.
	</Section.Item>
	<Section.Item title="Personal Skills" image="/img/code.png">
		My technical toolkit includes proficiency in a range of programming languages such as
		<strong>Python</strong>,
		<strong>Java</strong>, <strong>Kotlin</strong>, <strong>C++</strong>,
		<strong>JavaScript</strong>, <strong>TypeScript</strong>, <strong>C#</strong>, and
		<strong>SvelteKit</strong>. While I'm versatile across various domains, I've cultivated a
		particular expertise in web development. My development environment is primarily
		<strong>Windows</strong>, but I'm also proficient in <strong>Linux</strong>, having experimented
		with various distributions to understand their unique strengths and applications.
	</Section.Item>
	<Section.Item title="Passions" image="/img/urbex.png">
		Beyond the world of code, I have a diverse set of interests. I'm an avid gym-goer, focused on
		building my physique through consistent training and mindful nutrition. Music is an
		indispensable part of my life, serving as both inspiration and a tool for focus across a wide
		variety of genres. Photography offers a creative counterbalance to my technical pursuits,
		allowing me to capture fleeting moments with the same attention to detail I apply to coding. I
		also enjoy urban exploration, finding a unique tranquility in the quiet atmosphere of abandoned
		structures. Hiking is another activity I love, providing a great way to connect with nature and
		clear my mind.
	</Section.Item>
	<Section.Item title="Education" image="/img/isitgo.png">
		I am currently in my final year of high school at ISIS Galileo Galilei, an IT-focused
		institution. My commitment to learning is further demonstrated by my Cisco certifications:
		<ul>
			<li>
				<strong>IT Essentials:</strong> This certification covers the fundamentals of computer
				hardware, software, operating systems, networking concepts, IT security, and
				troubleshooting.
				<Heading.Link text="Download PDF" href="/pdf/IT_Essentials_certificate.pdf" />
			</li>
			<li>
				<strong>CCNA (Cisco Certified Network Associate):</strong> This certification validates the
				ability to install, configure, operate, and troubleshoot medium-sized routed and switched
				networks, including basic network security.
				<Heading.Link
					text="Download PDF"
					href="/pdf/CCNA_Introduction_to_Networks_certificate.pdf"
				/>
			</li>
		</ul>
	</Section.Item>
	<Section.Item title="Work Experience">
		As part of a school-work alternation program, I gained practical experience during a two-week
		engagement at an IT company, and also by assisting with the renovation and setup of a computer
		lab for a local school, providing hands-on experience in a professional IT environment.
	</Section.Item>
	<Section.Item title="Project Portfolio">
		I have a strong portfolio of projects, showcasing my ability to develop diverse applications
		across various programming languages. These include personal initiatives, which can be viewed on
		my GitHub profile, as well as projects completed for school assignments. Each project reflects
		my dedication to building robust and innovative solutions.
	</Section.Item>
	<Section.Item title="Career Path and Future Prospects">
		I am actively working towards becoming a full-stack developer. My goal is to leverage my skills
		and passion for technology to contribute to impactful projects and continuously evolve within
		the ever-changing landscape of software development. I am eager to embrace new challenges and
		opportunities that will allow me to grow both personally and professionally.
	</Section.Item>
</Section.Container>
